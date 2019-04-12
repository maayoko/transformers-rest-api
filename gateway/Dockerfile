FROM node:11.9
LABEL maintainer="maayoko@gmail.com"

USER root
RUN apt-get update && \
    mkdir /home/node/gateway && \
    chown -R node: /home/node/gateway

USER node
WORKDIR /home/node/gateway
EXPOSE 3000

CMD ["sh", "setup.sh"]