IS_PROJECT_INSTALLED=false

NODE_DIRECTORY="node_modules"
PKG_JSON="package.json"

echo "Checking if gateway application is already installed."

if [ ! -d "$NODE_DIRECTORY" ]; then
    echo "Gateway application not yet installed."
    echo "Installing application..."
    yarn install

    echo "Installation finished."
else
    echo "Already installed. Continue..."
fi

echo "Starting the gateway application in development mode..."
yarn start:dev
