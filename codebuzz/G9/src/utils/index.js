
export const getNameInitials = (fullName = "") => {
    const parts = fullName?.trim()?.split(" ");
    if (parts.length >= 2) {
        return parts[0][0]?.toUpperCase() + parts[1][0]?.toUpperCase();
    } else {
        return parts[0][0]?.toUpperCase();
    }
};


export const FormateCreatedDate = (date) => {
    const d = new Date(date);

    const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = d.toLocaleDateString("en-GB", { month: "short" });
    const year = d.getFullYear();

    return `${day} ${month}, ${year}`;
};