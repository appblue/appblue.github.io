---
title: UAE Snapshot Format
description: Short introduction to the format of the snapshot files produced by UAE
date: 2021-04-18
draft: false
tags:
    - file formats 
---
## Introduction

This is simple example showing how to access `t1` table in the database

```c
#include <stdio.h>
int main(int argc, char **argv) {

    return 0;
}
```
## Data Generation

It's rather simple task to write a parser that would handle given file format and produce a series of commands for `radare2` reverse engineering tool.

#### First Take

```python
import os
import sys

for i in range(10):
    print(f"index {i}")
```
