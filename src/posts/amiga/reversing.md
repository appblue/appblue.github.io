---
title: Reverse Engineering Amiga
description: How to approach reverse engineering project for Amiga demos.
date: 2021-04-19
draft: false
tags:
    - reverse engineering
---
## Introduction
This is simple example showing how to access `t1` table in the database

```text
    [0x9000000] C9 00 B2        move.l #$02, d0
    [0x9000004] C9 00 B2        rts
    [0x9000006] C9 00 B2        move.l #$02, d0
    [0x9000008] C9 00 B2        move.l #$02, d0
```

## Data Generation
