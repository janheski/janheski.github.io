---
title: Hosting jekyll site on vercel (now.sh)
description: That's really easy to host jekyll site on vercel (previous zeit now.sh)
summary: That's really easy to host jekyll site on vercel (previous zeit now.sh)
issuing_account: 12345
tags: [jekyll, vercel]
lang: en_US
---

It's very easy to host ready jekyll site on vercel.

Vercel was previously called now.sh or zeit...

In fact all what I've done is run `vercel` in cmd.  
If You don't have vercel already installed on Your machine You need to do it first.

#### 1. Open command line `cmd` and type `vercel`
If it doesn't work, you probably need to install now.

#### 1b. Install Vercel
type `npm i -g vercel` and it should help. Then return to point 1.

#### 1c. Setup vercel account
You probably need to setup vercel account so follow their guide.

#### 2. Test 
In command line in your jekyll project folder  `vercel`.  
This will display URL to site in preview mode.

I have accepted all default settings and chosen project name as `janheski`. 

#### 3. Deploy
In command line in your jekyll project folder  `vercel --prod`.  
This deploys to production URL.



After that I had to wait for few minutes but eventually my site was build, deployed and ready automatically on [https://janheski.vercel.app](https://janheski.vercel.app/) :D