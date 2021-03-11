FROM node:14.10.1

RUN mkdir /bmg

RUN npm install nodemon -g

WORKDIR /bmg
ADD ./package.json /bmg/package.json
RUN npm install

ADD ./nodemon.json /bmg/nodemon.json

EXPOSE 3000

CMD [ "npm", "start" ]