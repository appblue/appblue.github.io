
## Hosting Local Repository

 If you wish to host your own simple repository 1, you can either use a software package like devpi or you can use simply create the proper directory structure and use any web server that can serve static files and generate an autoindex.

In addition, it is highly recommended that you serve your repository with valid HTTPS. At this time, the security of your user’s installations depends on all repositories using a valid HTTPS setup.

### Directory structure

The directory layout is fairly simple, within a root directory you need to create a directory for each project. This directory should be the normalized name (as defined by PEP 503) of the project. Within each of these directories simply place each of the downloadable files. If you have the projects “Foo” (with the versions 1.0 and 2.0) and “bar” (with the version 0.1) You should end up with a structure that looks like:

```text
.
├── bar
│   └── bar-0.1.tar.gz
└── foo
    ├── Foo-1.0.tar.gz
    └── Foo-2.0.tar.gz
```

Once you have this layout, simply configure your webserver to serve the root directory with autoindex enabled. For an example using the built in Web server in Twisted, you would simply run `twistd -n web --path .` and then instruct users to add the URL to their installer’s configuration.

## Client Configuration

In either case, since you’ll be hosting a repository that is likely not in your user’s default repositories, you should instruct them in your project’s description to configure their installer appropriately. For example with pip:


```shell
python3 -m pip install --extra-index-url https://python.example.com/ foobar
```

Use `pip config list -v` to get list of locations where your `pip.conf` is located. Then go to one of the location (I prefer user) and add your URL. 
The file should look like this, if empty then add the lines.

```
[global]
index-url=https://pypi.org/simple
extra-index-url=<your_url>
```

In case if you want pip to look into your URL first then switch the places of url on above options.

## Example Setup

using pip config, on user or global level. I have /etc/pip.conf configured like this:

```
[global]
index=http://my-company/nexus/repository/pypi-group/pypi
index-url=http://my-company/nexus/repository/pypi-group/simple
trusted-host=my-company
```

but you can configure this using pip config on user or global level, something like:

```shell
pip config --user set global.index http://my-company/nexus/repository/pypi-group/pypi
pip config --user set global.index-url http://my-company/nexus/repository/pypi-group/simple
pip config --user set global.trusted-host my-company
```

### NOTES
* `--index-url` is used by pip install
* `--index` is used by pip search
