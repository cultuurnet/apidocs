#!/bin/bash

WORKSPACE_ID=$1
USERNAME=$2
PASSWORD=$3
PROJECT_ID=$4

TOKEN=$(curl -s --location --request POST 'https://publiq.stoplight.io/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw "{
    \"workspaceIntegrationId\": ${WORKSPACE_ID},
    \"usernameOrEmail\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\",
    \"source\": \"web\"
}" | jq -r '.token')

#echo $TOKEN
#echo $PROJECT_ID

HIDDEN_BRANCHES=$(curl -s --location --request GET "https://publiq.stoplight.io/api/v1/projects/${PROJECT_ID}/branches" \
--header "Authorization: Bearer ${TOKEN}" | jq -r -c '.items[] | select(.is_published == false) | @base64')

#echo $HIDDEN_BRANCHES

for BRANCH in $HIDDEN_BRANCHES; do
    _jq() {
     echo ${BRANCH} | base64 --decode | jq -r ${1}
    }
   BRANCH_SLUG=$(_jq '.slug')
   BRANCH_ID_PREFIX='br:'
   BRANCH_ID_PREFIXED=$(echo $(_jq '.id') | base64 --decode)
   BRANCH_ID=${BRANCH_ID_PREFIXED#$BRANCH_ID_PREFIX}

   #echo $BRANCH_SLUG
   #echo $BRANCH_ID

   EXISTS=$(git branch --list ${BRANCH_SLUG})

   if [[ -z ${EXISTS} ]]; then
    echo "branch ${BRANCH_SLUG} should be removed"
  else
    echo "branch ${BRANCH_SLUG} should be kept"
  fi
done
