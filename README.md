
# HR A11y
This is an application for demoing the full range of the axe DevTools product.

## Prerequisites
* NodeJS v10 (or greater)
* Docker v20.10 (or greater)
* The jenkins docker script was desinged for a MacOS environment. If you are using WindowsOS, you will need to run the docker commands manually. Check the `__setup.sh` script file.

## Installation
* First off, clone this repo `git clone git@github.com:dequelabs/hr-a11y.git`
* Open a command prompt, navigate to the project folder, and run `npm install` or `yarn`

## Run the full environment

### Jenkins
* [Download the volume data backup from our SFTP server](https://sftp.dequecloud.com/?u=xaeyn9dtTX&p=4WgeMh6BgQ&path=/hra11y-jenkins.tar)
* Move the downloaded file to the `{PROJECT_ROOT}/Jenkins/volume_backups`
* Run the `./__setup.sh` script
    - if you are getting a permissions error here, run `sudo chmod +x __setup.sh` and try to run again.
* Start the Jenkins instance by using `docker-compose up --build`
* Navigate to [http://localhost:8080](http://localhost:8080)
* The user credentials are:
    - user: admin
    - password: password

### Web Application (server + front-end)
* In a new command prompt window, start the hr-a11y app by running `npm run dev` or `yarn dev`
* Open a webbrowser and navigate to [http://localhost:3001](http://localhost:3001)

### Automated Tests
* In a new command prompt window, start the automated tests by running `npm test` or `yarn test`
* You can also navigate to the [jenkins install](http://localhost:8080), navigate to the hra11y project and generate a new build.