Live site URL :-
https://social-media-site-frontend.vercel.app/

## OVERVIEW :

- A simple mock social media site with login functionality.
- Login credentials are already filled in the login fields.
- Registration doesn't work (See below)
- There are buttons throughout the application that are merely placeholders (i.e. just for visual appearance) and have no functionality.

## REGISTRATION WILL NOT WORK :

- Registration will NOT work because the site's image storage mechanism is not hooked to a 3rd party file storage/bucket (i.e. S3 bucket). Attempting to register will result in an error as the following:-

`Error: ENOENT: no such file or directory, open 'public/assets/xxxxx.jpg'`

Storage only works on a localhost and is controlled by multer.
See "server\index.js" for the multer configuration.
