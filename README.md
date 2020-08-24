# Stormboard
A simple tool for everyone to participate in brainstorms. Create a meeting and invite your team by sending them the link. Discuss your ideas with the comfort of anonymity.

## Use Case
* When you are brainstorming ideas with your team, this allows for everyone to get their ideas on the table. Thanks to the anonimity, it doesn't matter who submits it, the best idea should win.

## Installation
1. Fork & clone this repo.
2. Run ```npm install```
3. Run ```sequelize db:create```
4. Run ```sequelize db:migrate```
5. [Sign up for your Google OAuth2.0 Credentials.](https://developers.google.com/identity/protocols/oauth2) (This takes about 5-10 min.)
6. Run ```touch .env```
7. Inside of your .env add the following lines and fill in your CLIENT_ID and CLIENT_SECRET_KEY:
```CLIENT_SECRET_KEY="insert your info here"```
```CLIENT_ID="insert your info here"```
8. Run ```node server.js```
9. Go to ```localhost:3000```
10. Nice!
