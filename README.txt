Scripts needed: 
1) npm run clean: For eslint and prettier 
2) npm run build: For jasmine testing (Throws an error everytime it is called) as well as npx
3) npm run start: For nodemon

Endpoints:
'/'       -> Home page
'/resize/:{ImageNameWithoutExtension}/:{RequiredWidth}?/:{RequiredHeight}?'  -> to preform resize operation
'/upload' -> To upload an image to the directory
'/exists' -> to check if an image already has been resized and hence already exists
