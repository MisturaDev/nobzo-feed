# Nobzo Feed App

A single-screen React Native app built with **Expo + TypeScript** that displays an image feed.

## **Features:**

- **Fetches images** from the Picsum Photos API  
- **Infinite Scroll:** Loads more images as you scroll down  
- **Pull-to-Refresh:** Pull down to reload from the first page  
- **Loading States:** Shows spinner on initial load and while fetching more  
- **Error Handling:** Displays error message with Retry button if fetch fails  
- **Empty State:** Displays message if no images are returned  
- **Responsive UI:** Works on all screen sizes and orientations  

## **Technologies Used:**

- React Native  
- Expo  
- TypeScript  


## Installation

1. Clone the repo
   ```bash
   git clone https://github.com/MisturaDev/nobzo-feed.git


2. Navigate into the project directory:
   ```bash
   cd nobzo-feed

3. Install dependencies:
   ```bash
   npm install

4. Run the app with Expo Go
   ```bash
   npm run start

5. Run the app:
   - Scan the QR code using Expo Go on your mobile device 
   - Run on an Android/iOS emulator


## **Assumptions:**

- **Each feed item contains:** `id`, `author`, and `download_url`  
- **Default fetch limit:** 20 items per page  
- **Infinite scroll triggers:** when the user is 50% from the bottom of the list  
- **App is single-screen** as requested in the task  
- **Styling:** focused on clean, functional UI rather than visual perfection  
- **State management:** React hooks are sufficient (no external libraries used)  
