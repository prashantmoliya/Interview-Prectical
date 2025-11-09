import ImageKit from "imagekit";

const imgKit = new ImageKit({
    publicKey: "public_IVehEvcMeewylFa6w6hFDfIPHTQ=",
    privateKey: "private_SJmFEgLPH4cPFVWMTPZlC9uxXxo=",
    urlEndpoint: "https://ik.imagekit.io/qqydb0grks",
    authenticationEndpoint: "/auth",
});

export { imgKit };