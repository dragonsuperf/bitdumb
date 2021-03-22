FROM node:15.3-alpine
USER root
WORKDIR /frontend
COPY ./package.json /frontend/package.json
COPY ./.eslintrc.js /frontend/.eslintrc.js
COPY ./.prettierrc.js /frontend/.prettierrc.js

ADD /start-frontend.sh /frontend/start-frontend.sh
RUN chmod +x /frontend/start-frontend.sh

CMD ["/bin/sh", "build-frontend.sh"]