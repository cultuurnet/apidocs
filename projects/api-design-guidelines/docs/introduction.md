---
stoplight-id: d6a8ba3f3c186
---

# Introduction

Welcome to publiq's API design and documentation guidelines! 👋

This space is meant to share best practices that should be followed for every API that is developed within our organization.

> If you are instead **looking to integrate with one of our APIs**, take a look at our **[API docs](https://docs.publiq.be/)**!

## Goal

Many of publiq's partners integrate with not only one, but multiple of our APIs. Additionally a lot of our own applications that are built by either internal or external developers communicate with multiple of our APIs.

To **reduce the learning curve of integrators that work with multiple of our APIs**, we have agreed upon some standards for common functionality. These standards make it more predictable how our APIs work (*"learn once, apply everywhere"*). In some cases it might even be possible to re-use existing code for boilerplate functionality like authentication, error handling, and so on in an integration.

They also **speed up development of our APIs** by reducing the time spent on bikeshedding over design decisions per API.

Last but not least, a common approach for every API makes it possible to **provide generic tooling** that can be re-used for every API, like https://postman.publiq.be.

## Why do we not use standard *x*?

We try to follow industry standards where possible, but sometimes there are competing standards, or we have to deviate due to backward-compatibility reasons so we can align existing APIs with these standards.

## Why does API *x* not follow the standards?

Some APIs were built before these standards were agreed upon. When we add new standards, we try to look at existing APIs and make sure they are compatible with them or can be made compatible with them without too much effort. However this is not always possible, or the compatibility has yet to be added.
