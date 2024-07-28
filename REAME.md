# TurfSpot

TurfSpot is a MERN stack application used for booking turf grounds. The application has three modules: User, Owner, and Admin.

## Features

### User Module
- **View Turf:** Users can view available turf grounds.
- **Book Turf:** If a time slot is available, users can book the turf using dummy payment via Stripe. 
- **Booking Confirmation:** Users will receive an email containing booking details, time, and a QR code. Scanning the QR code will show all booking details.
- **Booking History:** Users can view their booking history.
- **Become an Owner:** Users can request to become a turf owner by filling out a form. Upon admin approval, users receive an email with a URL to the owner's website.

### Owner Module
- **Add Turf:** Owners can add new turf grounds.
- **View Turf:** Owners can view all their turfs.
- **View Bookings:** Owners can view all bookings for their turfs.
- **View Ratings:** Owners can see ratings given by users.
- **View Transactions:** Owners can view all transactions related to their turfs.

### Admin Module
- **Accept Owner Requests:** Admin can accept or reject requests from users to become owners.
- **View All Owners:** Admin can view all registered owners.
- **View All Users:** Admin can view all registered users.
- **View Reviews:** Admin can view all reviews.
- **View All Transactions:** Admin can view all transactions in the system.

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS, Daisy UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Payments:** Stripe
- **Image Uploads:** Cloudinary
- **Other:** JavaScript

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/RijoKsd/TurfSpot.git
    ```
2. Install dependencies for both client and server
    ```bash
    cd TurfSpot
    npm install
    cd server
    npm install
    cd ../client/owner
    npm install
    cd ../user
    npm install
    ```
3. Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongo_uri
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4. Run the application
    ```bash
    # To run the backend
    cd server
    npm run server

    # To run the owner client
    cd ../client/owner
    npm run dev

    # To run the user client
    cd ../user
    npm run dev
    ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or questions, please contact us at [your-email@example.com](mailto:your-email@example.com).
```