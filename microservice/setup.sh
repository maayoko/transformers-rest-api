IS_PROJECT_INSTALLED=false

NODE_DIRECTORY="node_modules"
PKG_JSON="package.json"

echo "Checking if microservice application is already created..."

if [ ! -d "$NODE_DIRECTORY" ]; then
    echo "Microservice application not yet installed."
    echo "Installing application..."
    yarn install

    echo "Installation finished."
else
    echo "Already installed. Continue..."
fi

echo "Starting the microservice in development mode..."
yarn start
