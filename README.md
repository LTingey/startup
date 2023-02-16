# Startup
**startup project for CS260: Map Your Travels**


## Elevator Pitch
Are you a big traveler but often forget all of the places you've been? With this app, you can easily keep track of every place you've traveled with an interactive map. Just select a state you have set foot in and the app will color it in. You can also add your friends and be notified when they have been to a new place. (Disclaimer: Since this is brand new, it will only be the states, but soon it will be a map of the whole world!) \
![mySketch](startuppicsmall.jpg) \
Key Features
* Secure login over HTTPS
* Display map of U.S.
* Ability to select a state
* Colors in state
* Save states
* Notifies when others have selected a state

## Notes
#### Server Stuff
What I learned from GitHub assignment: fetch then pull and stage, commit, push \
My IP address: 3.133.80.15 \
My domain: tingey.click \
How to SSH into my server: `ssh -i ~/Desktop/cs260/production.pem ubuntu@3.133.80.15` \
After changing files in the server, **don't forget to restart Caddy**: `sudo service caddy restart` \
Deploy to server: `./deployWebsite.sh  -k ~/Desktop/cs260/production.pem -h 3.133.80.25` \
Deploy to Simon: `./deployFiles.sh -k ~/Desktop/cs260/production.pem -h tingey.click -s simon` \
What I learned from Simon assignment: I really need to learn more about svg, Caddy needs one of the files to be named index.html \
#### CSS
**Flex:** `align-content` determines the spacing between lines, while `align-items` determines how the items as a whole are aligned within the container \
