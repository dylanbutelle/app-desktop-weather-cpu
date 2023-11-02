module.exports = {
  packagerConfig: {
    asar: true,
    icon: './images/weather-app-icon-3',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {icon: './images/weather-app-icon-3.icns'},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'dylanbutelle',
          name: 'app-desktop-weather-cpu'
        },
        prerelease: true
      }
    }
  ]
};
