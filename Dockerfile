FROM nginx:latest
MAINTAINER william.wang <wwl@hexapodant.com> 
RUN echo "Asia/Shanghai" > /etc/timezoneRUN ln -sf /usr/share/zoneinfo/Asia/ShangHai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
RUN rm /etc/nginx/conf.d/default.conf 
ADD default.conf /etc/nginx/conf.d/
COPY dist/build/h5/  /usr/share/nginx/html/