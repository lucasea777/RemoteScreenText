# Install nodejs
[https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo bash
sudo apt-get -y install nodejs git
```

Remember that npm is installed by the nodejs installation!!
So, _never_ run `sudo apt-get install npm`

# Install Package
```bash
#npm install git+https://git@github.com/visionmedia/express.git
git clone https://github.com/lucasea777/RemoteScreenText
cd RemoteScreenText
npm install
npm run server
# y en otra terminal
npm run control
```

Links:
    * http://stackoverflow.com/questions/3415797/adb-forward-remote-port-to-local-machine
    * https://developer.android.com/studio/command-line/adb.html
    * http://androideazteca.blogspot.com.ar/2013/06/pues-bien-parece-que-como-bloggero-me.html
    * http://stackoverflow.com/questions/23153999/sending-data-from-an-android-activity-to-pc-through-adb
