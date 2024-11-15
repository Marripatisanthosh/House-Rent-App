# RentIt  <!--[Live Link](https://rentit-jei9.onrender.com/) | [Demo Video](https://youtu.be/SlHoExFpXx8) -->

MERN stack house rental app with realtime chat & request updates using socket.io and being hosted on [Render](https://render.com/). 

> [**Click here to visit the live site**](https://rentit-jei9.onrender.com/)


> [**Click here to watch the demo video**](https://youtu.be/SlHoExFpXx8)

## Screenshots

<p align="center">
    <a href="ss/home.png"><img src="ss/home.png" alt="Home" style="height: 90%; width: 90%; margin-right: 10px;"></a>
    <a href="ss/profile.png"><img src="ss/profile.png" alt="Profile" style="height: 90%; width: 90%; margin-right: 10px;"></a>
<!--     <a href="ss/search.png"><img src="ss/search.png" alt="Search" style="height: 300px;"></a> -->
</p>

<details>
  <summary>View More</summary>
  
  <div style="display: flex; overflow-x: auto; padding: 10px; gap: 10px;">
<!--     <a href="ss/profile.png"><img src="ss/profile.png" alt="Profile" style="height: 150px;"></a> -->
<!--     <a href="ss/home.png"><img src="ss/home.png" alt="Home" style="height: 150px;"></a> -->
    <a href="ss/search.png"><img src="ss/search.png" alt="Search" style="height: 150px;"></a>
    <a href="ss/listing.png"><img src="ss/listing.png" alt="Listing" style="height: 150px;"></a>
    <a href="ss/register.png"><img src="ss/register.png" alt="Register" style="height: 150px;"></a>
    <a href="ss/request.png"><img src="ss/request.png" alt="Request" style="height: 150px;"></a>
    <a href="ss/profile_edit.png"><img src="ss/profile_edit.png" alt="Profile Edit" style="height: 150px;"></a>
    <a href="ss/add_property.png"><img src="ss/add_property.png" alt="Add Property" style="height: 150px;"></a>
    <a href="ss/edit_property.png"><img src="ss/edit_property.png" alt="Edit Property" style="height: 150px;"></a>
    <a href="ss/user_profile.png"><img src="ss/user_profile.png" alt="User Profile" style="height: 150px;"></a>
    <a href="ss/admin_or.png"><img src="ss/admin_or.png" alt="Admin OR" style="height: 150px;"></a>
    <a href="ss/admin_pr.png"><img src="ss/admin_pr.png" alt="Admin PR" style="height: 150px;"></a>
    <a href="ss/properties.png"><img src="ss/properties.png" alt="Properties" style="height: 150px;"></a>
    <a href="ss/owner_requests.png"><img src="ss/owner_requests.png" alt="Owner Requests" style="height: 150px;"></a>
    <a href="ss/user_requests.png"><img src="ss/user_requests.png" alt="User Requests" style="height: 150px;"></a>
    <a href="ss/user_chat.png"><img src="ss/user_chat.png" alt="User Chat" style="height: 150px;"></a>
    <a href="ss/owner_chat.png"><img src="ss/owner_chat.png" alt="Owner Chat" style="height: 150px;"></a>
    <a href="ss/ag_dial.png"><img src="ss/ag_dial.png" alt="Agent Dialog" style="height: 150px;"></a>
    <a href="ss/user_pay.png"><img src="ss/user_pay.png" alt="User Pay" style="height: 150px;"></a>
    <a href="ss/contract.png"><img src="ss/contract.png" alt="Contract" style="height: 150px;"></a>
    <a href="ss/ownerchat_final.png"><img src="ss/ownerchat_final.png" alt="Owner Chat Final" style="height: 150px;"></a>
    <a href="ss/brokeboi_tl.png"><img src="ss/brokeboi_tl.png" alt="Brokeboi TL" style="height: 150px;"></a>
    <a href="ss/listing_withstatus.png"><img src="ss/listing_withstatus.png" alt="Listing with Status" style="height: 150px;"></a>
  </div>

</details>



## Installation

```sh
git clone https://github.com/nonkloq/rentit.git
cd rentit
```

rename `.env.example` to `.env` and fill in the variables in both frontend and backend folders.

### To Build And Run the app

@project root directory `~/rentit`
```sh
npm run build # will install all npm packages and build the project
npm run start
```

### To run server and client separately

to start the server
```sh
cd backend
npm install
npm run dev
```

to start the client
```sh
cd frontend
npm install
npm run start
```

The property listings are sampled from the [Houses Dataset](https://github.com/emanhamed/Houses-dataset) and property details filled using Gemini-1.5-Flash via the [Gemini API](https://ai.google.dev/). see [datafiller.ipynb](datafiller.ipynb) for code and data-filling process.
