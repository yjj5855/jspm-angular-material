FROM ubuntu:trusty
MAINTAINER Feng Honglin <hfeng@tutum.co>

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN rm -v /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

ADD ../public /app/public
ADD ../config.js /app/config.js
ADD ../build.js /app/build.js
ADD ../jspm_packages/system.js /app/jspm_packages/system.js
ADD ../jspm_packages/system.src.js /app/jspm_packages/system.src.js

EXPOSE 80

CMD ["/usr/sbin/nginx"]