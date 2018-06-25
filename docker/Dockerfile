FROM php:5.6-apache

##COPY FILE OFF THE CONTAINER
##RUN cp -a /var/www/html/vendor d:\\htdocker\\slim3-starterpack
##$docker cp slim_php_1:/var/www/html/vendor d:\\htdocker\\slim3-starterpack

#LOAD MOD REWRITE
RUN a2enmod rewrite

# Apache conf
# to see live logs we do : docker logs -f [CONTAINER ID]
# without the following line we get "AH00558: apache2: Could not reliably determine the server's fully qualified domain name"
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
# autorise .htaccess files
RUN sed -i '/<Directory \/var\/www\/html\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "session.gc_maxlifetime = 360000; " >> /usr/local/etc/php/conf.d/uploads.ini

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "date.timezone = 'Asia/Bangkok';" >> /usr/local/etc/php/conf.d/uploads.ini

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = '500M';" >> /usr/local/etc/php/conf.d/uploads.ini

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
	&& echo "upload_max_filesize = '30M';" >> /usr/local/etc/php/conf.d/uploads.ini

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
	&& echo "post_max_size = '30M';" >> /usr/local/etc/php/conf.d/uploads.ini

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 600;" >> /usr/local/etc/php/conf.d/uploads.ini

#LOAD PDO
RUN docker-php-ext-install pdo pdo_mysql

