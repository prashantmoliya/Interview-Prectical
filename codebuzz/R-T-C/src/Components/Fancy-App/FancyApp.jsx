import React, { useEffect, useCallback } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useRazorpay } from 'react-razorpay'; // Ensure correct import

const FancyApp = () => {
    useEffect(() => {
        NativeFancybox.bind("[data-fancybox]", {}); // Binds Fancybox to elements with the data-fancybox attribute

        // Cleanup binding on component unmount               
        return () => {
            NativeFancybox.destroy();
        };
    }, []);

    // Use the Razorpay instance directly from useRazorpay()
    // const Razorpay = useRazorpay();

    const handlePayment = useCallback(async () => {
        // Simulate a createOrder function that returns an order ID (you should implement this)
        // const order = await createOrder();

        const order = {
            amount: 3000, // Amount in paise (example: 3000 = 30 INR)
            currency: 'INR',
        };

        const options = {
            key: "YOUR_KEY_ID", // Replace with your Razorpay key
            amount: "3000", // Amount in paise (e.g., 3000 = 30 INR)
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: (res) => {
                console.log("handler++", res); // Log the response from Razorpay
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };


        if (window.Razorpay) {
            const rzpay = new window.Razorpay(options); // Create Razorpay instance using global Razorpay
            rzpay.open(); // Open Razorpay's checkout window
        } else {
            console.error('Razorpay instance is not loaded');
        }
    }, []);

    return (
        <>
            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>Fancy App</h2>
            </div>

            <div className='gallery-container text-center mt-4 gap-2'>
                <a data-fancybox="gallery" href="https://lipsum.app/id/60/1600x1200">
                    <img src="https://lipsum.app/id/60/200x150" width="200" height="150" />
                </a>
                <a data-fancybox="gallery" href="https://lipsum.app/id/61/1600x1200">
                    <img src="https://lipsum.app/id/61/200x150" width="200" height="150" />
                </a>
                <a data-fancybox="gallery" href="https://lipsum.app/id/62/1600x1200">
                    <img src="https://lipsum.app/id/62/200x150" width="200" height="150" />
                </a>
                <a data-fancybox="gallery" href="https://lipsum.app/id/63/1600x1200">
                    <img src="https://lipsum.app/id/63/200x150" width="200" height="150" />
                </a>
                <a data-fancybox="gallery" href="https://lipsum.app/id/64/1600x1200">
                    <img src="https://lipsum.app/id/64/200x150" width="200" height="150" />
                </a>
            </div>

            <div className='text-center mt-5'>
                <h2 style={{ textDecoration: 'underline' }}>Payment Gateway (Razorpay) Example</h2>
                <button className='btn btn-warning border-1 border-black mt-3' onClick={handlePayment}>Pay Now</button>
            </div>
        </>
    );
};

export default FancyApp;
