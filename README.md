# Pet Adoption Application Project Plan & installation guide

Our project aims to create a mobile application for pet adoption and placement for adoption, aligning with Qatar's National Development Strategy (NDS) goals to improve the quality of life. This is achieved by recognizing the significant impact pets have on physical and mental health. The application positions itself not just as a pet adoption platform but as a component of a comprehensive wellness strategy.

## Possible Effects

- **Reduction in Homeless Pets:** By facilitating easier pet adoptions, the app aims to decrease the number of animals in shelters.
- **Economic Relief:** Reducing the number of homeless pets can lessen the economic burden on local governments and NGOs.
- **Community Engagement:** The app encourages community participation in pet adoption, fostering a sense of responsibility and engagement with local issues.

## Functional Features

- **Add Pet for adoption:** Enables registered breeders and pet owners to list pets for adoption with detailed profiles, including health, breed, and care information.
- **Adopt a Pet:** Users can browse pets available for adoption, using filters like breed, name, age, etc., to find the right match.
- **Edit User Profile:** Users can Change their Profile information including Name and Avatar.

## Preliminary Prototype Requirements

- **Home Page:** Features pets for adoption and a quick search bar.
- **Pet Profiles:** Detailed pages for each pet, including photos, health information, and adoption details.
- **User Profile:** A section for users to Edit their Profile.
- **User Registration:** A straightforward sign-up process for adopters, and those looking to list a pet.
- **Search and Filter:** Enables users to search for pets by various criteria.

## Project Plan

### Phase 1: Requirements and Design (Week 1)
- **Roles:** All Team Members
- **Tasks:** Define detailed app requirements, develop initial designs.

### Phase 2: Development (Week 2)
- **Roles:** All Team Members
- **Tasks:** Develop the app's frontend and backend, set up the database.

### Phase 3: Testing and Feedback (Week 3)
- **Roles:** All Team Members
- **Tasks:** Perform thorough testing, collect beta tester feedback, and refine the app based on feedback.

### Phase 4: Continuous Testing (Week 4)
- **Roles:** All Team Members
- **Tasks:** Establish a CI pipeline to automate the building and testing of the app with every code change.

By adhering to this project plan and focusing on the identified societal need, our application aims to significantly impact pet adoption rates, reduce the number of homeless animals, and align with broader national development goals.

## Prototype
![image](https://github.com/3bdop/INFS3203-project02/assets/158258229/d625336d-d1eb-41eb-97a3-3cc7228f95e3)


# How to run the application

## Prerequisites
Before you begin, ensure you meet the following requirements:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- npm (comes installed with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  
  You can install Expo CLI by running:
  ```
  npm install -g expo-cli
  ```
  
## Installation

To install the project, follow these steps:

1. Clone the repository:
   
   ```
   git clone https://github.com/3bdop/INFS3203-project02.git
   ```
3. Navigate to the project directory:
   
   ```
   cd your-project-name
   ```
3. Install dependencies:
   
- Using npm:
  ```
  npm install
  ```

- Using Yarn:
  ```
  yarn install
  ```

## Running the Application

To run the application on your local machine, follow these steps:

1. Start the Expo developer server:
   
- Using npm:
  
  ```
  npm start
  ```
- Using Yarn:
  
  ```
  yarn start
  ```
2. Expo CLI will start Metro Bundler, which is a JavaScript bundler that compiles your app’s code and assets. Once it's ready, you'll see a QR code in the terminal.

3. To run the app on your mobile device, download the [Expo Go](https://expo.dev/client) app from the App Store (iOS) or Google Play (Android). Scan the QR code with your device to open your project.

4. To run the app on a simulator/emulator:
- **iOS Simulator** (Mac only):
  Press `i` in the terminal running your project.
- **Android Emulator**:
  Press `a` in the terminal running your project.




