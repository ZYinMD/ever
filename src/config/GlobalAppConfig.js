let data = {};

class GlobalAppConfig
{
  addConfig(key, value)
  {
    data = Object.assign({}, data, { [key]: value });
  }

  getConfig(key)
  {
    return data[key];
  }

  removeConfig(key)
  {
    data[key] = null;
  }
}

export default new GlobalAppConfig();
