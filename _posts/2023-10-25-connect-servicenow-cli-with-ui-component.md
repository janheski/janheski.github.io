---
title: Connect ServiceNow CLI with UI Component
description: Connect ServiceNow CLI with developer instance and connect UI Component
summary: How to connect ServiceNow CLI with developer SN instance and connect UI Component for UI Builder
tags: [servicenow, ui-builder, sn-cli]
lang: en_US
---

#### 1. Follow a course

Firstly You can follow a course "External Component Development" in [NowLearning platform ](https://nowlearning.servicenow.com/lxp/en/now-platform/now-platformname?id=learning_course_prev&course_id=38717dd9db7320d0785e2a591396199d)

Below You can find steps I executed.

#### 2. Install nodejs, npm

As described in the course, install nodejs and npm. I have below versions:

```
> node -v
v12.16.1
```

```
npm -v
6.13.4
```

#### 3. Install ServiceNow CLI

Download ServiceNow CLI installator from [ServiceNow Store](https://store.servicenow.com) by searching for "ServiceNow CLI"

Install ServiceNow CLI on your local machine.

#### 4. Set SNC profile

Run below command and fill information to connect to your developer instance.

`snc configure profile set`

It will ask for host, login method, username, password and output format.
I've chosen Basic authentication and JSON format.

#### 5. Install UI Component

You can check for available extensions by executing below command:

```
snc extension list-available -o table
```

If ui-component is not installed install it with below command:

```
snc extension add --name ui-component
```

Verify the extension was installed by running the following commands

`snc ui-component --help`

`snc ui-component --version`

### 6. Login to the instance from UI Component

This step is ommited in the course.

Execute below command with host and credentials replaced:

```
snc ui-component login --host {host} --method "basic" --username {username} --password {password}
```

#### 7. Create a component project

Execute below command:

```
snc ui-component project --name @{company-name}/{project-name} --description '{description}' --profile {default or profile-name}
```

#### 8. Fix warnings

To fix warnings installing CLI Metadata application should help as described here:
https://jessems.com/posts/2023-02-16-this-instance-does-not-support-dynamic-commands
