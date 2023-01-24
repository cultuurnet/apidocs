#!/bin/bash

WORKSPACE_ID=$1
USERNAME=$2
PASSWORD=$3
PROJECT_ID=$4

echo "Fetching JWT..."

TOKEN=$(curl -s --location --request POST 'https://publiq.stoplight.io/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw "{
    \"workspaceIntegrationId\": ${WORKSPACE_ID},
    \"usernameOrEmail\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\",
    \"source\": \"web\"
}" | jq -r '.token')

echo "Successfully fetched JWT."

HIDDEN_BRANCHES=$(curl -s --location --request GET "https://publiq.stoplight.io/api/v1/projects/${PROJECT_ID}/branches" \
--header "Authorization: Bearer ${TOKEN}" | jq -r -c '.items[] | select(.is_published == false) | @base64')

for BRANCH in $HIDDEN_BRANCHES; do
    _jq() {
     echo ${BRANCH} | base64 --decode | jq -r ${1}
    }
   BRANCH_SLUG=$(_jq '.slug')
   BRANCH_ID_PREFIX='br:'
   BRANCH_ID_ENCODED=$(_jq '.id')
   BRANCH_ID_PREFIXED=$(echo ${BRANCH_ID_ENCODED} | base64 --decode)
   BRANCH_ID=${BRANCH_ID_PREFIXED#$BRANCH_ID_PREFIX}

   echo "Checking branch with slug ${BRANCH_SLUG} and (base64 decoded) id ${BRANCH_ID}..."

   EXISTS=$(git ls-remote --heads origin ${BRANCH_SLUG})

   if [[ -z ${EXISTS} ]]; then
    echo "Branch ${BRANCH_SLUG} does not exist in GitHub, removing it from Stoplight..."
    curl -s --location --request POST 'https://publiq.stoplight.io/graphql' \
    --header 'Content-Type: application/json' \
    --header "Authorization: Bearer ${TOKEN}" \
    --data-raw "{
      \"query\": \"mutation DeleteBranch(\$branchId: Int!) {\n    deleteBranches(where: {id: {_eq: \$branchId}}) {\n        returning {\n            id\n            projectId\n            __typename\n        }\n        __typename\n    }\n}\",
      \"variables\": {
        \"branchId\": ${BRANCH_ID}
      }
    }"
    echo "Branch ${BRANCH_SLUG} successfully removed from Stoplight."
  else
    echo "branch ${BRANCH_SLUG} still exists in GitHub, keeping it on Stoplight."
  fi
done
