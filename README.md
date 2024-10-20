## SIMON JONES submission - Evetogy React + Next.js
This is a simple grid dislay of fetched 'events' data from an API, as part of the interview process for Eventogy.

### Tech stack
Main technologies in use are
- React (FE framework)
- Nextjs (FE framework)
- Typecript (language)
- MaterialUI (component library)
- Prettier (code formatting)

### To run locally
- Clone repo locally with HTTPS or SSH method
- From the root folder, run `npm install` to install all required dependencies.
- Run in terminal: `npm run dev`
- Open localhost port as indicated


### Noteworthy features: user experience as primary focus
- Fully responsive from mobile to desktop screen widths
- Search by event name, location name, or address
- Sort by either createdAt or updatedAt
- Pin & unpin items to the beginning of the list, immune to sorting mode
- Pagination implemented, but only cosmetically (API returned static data, was not actually paginated)
- Hover animations to indicate interactability (not actually interactable here, since assignment was simply to display cards, not navigate to other pages)

### Noteworthy features: contributing developers as primary focus
- Re-usable components adhered to in modern React standards, very little duplicated code.
- Prettier formatting implemented for readibilty & consistent code structure.

### Improvements that could be made:
- Add ability to add a new event (API did not have POST facilities)
- Improve visual aesthetic of card components, particularly with whitespace that is present when pieces of data are empty from the API response for some items
- Add ability to trigger a re-fetch of data
- Add user-centric error handling for when API fails


## Screenshots:
![image](https://github.com/user-attachments/assets/662ff9d3-e84f-4feb-854f-6863c261cdd0)
![image](https://github.com/user-attachments/assets/b84c6871-5fe2-434e-8a41-68ea7f04b65c)
![image](https://github.com/user-attachments/assets/f8d75647-52ce-4cd7-a731-7c3cd46fd395)


