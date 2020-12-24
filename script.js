curl --location --request GET 'tfcommerce-api-eks.cloudqa.thermofisher.net/api/store/orders/deferred-payments/search' \
--header 'Content-Type: application/json' \
--header 'userId: 915918' \
--header 'countryCode: kr' \
--header 'Authorization: Basic dGZkZWZlcnJlZHBheW1lbnRzOnRoZXJtb2ZpccjE=' \
--header 'Cookie: JSESSIONID=D330BF758C8F9E916031D25FC86' \
--data-raw '{
"searchQueryParams": {
"orderType": "tc",
"dateFrom": "2019-11-20",
"dateTo": "2020-11-25"
},
"requestOptions": {
"sortOrder": "asc",
"sortProperty": "orderDate"
}
}'