FROM node:11.9
LABEL maintainer="maayoko@gmail.com"

USER root
RUN apt-get update && \
    mkdir /home/node/microservice && \
    chown -R node: /home/node/microservice

USER node
WORKDIR /home/node/microservice
EXPOSE 3009

CMD ["sh", "setup.sh"]