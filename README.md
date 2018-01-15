# orchardbot-app

*Main application for Orchardbot, the robot who can turn on a tap*

## Design

*Yes, I know, this bot is hilariously over-engineered and excessive, 
but hey, we had some fun 😅*

![Design](https://image.ibb.co/jHM0Zv/Orchardbot_Design.jpg "Design")

This bot is designed with micro-services communicating over websockets.
- The API validates changes and proxies them to any socket clients listening
- The scheduler watches the appropriate crons and triggers changes accordingly
- The controller listens for changes and updates the actual embedded system's I/O ports



