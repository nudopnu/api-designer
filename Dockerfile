FROM swaggerapi/swagger-ui

# Replace the default index.html with a poll-refreshing one
COPY custom-index.html /usr/share/nginx/html/index.html