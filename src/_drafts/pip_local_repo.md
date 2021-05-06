
## Default Configuration

Use `pip config list -v` to get list of locations where your `pip.conf` is located. Then go to one of the location (I prefer user) and add your URL. 
The file should look like this, if empty then add the lines.

```
[global]
index-url=https://pypi.org/simple
extra-index-url=<your_url>
```

In case if you want pip to look into your URL first then switch the places of url on above options.

## Setup

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
