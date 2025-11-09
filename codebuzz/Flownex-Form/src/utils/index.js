// Name First Leter Capitalization

export const getNameInitials = (fullName) => {
    const parts = fullName?.trim()?.split(" ");
    if (parts.length >= 2) {
        return parts[0][0]?.toUpperCase() + parts[1][0]?.toUpperCase();
    } else {
        return parts[0][0]?.toUpperCase(); // fallback if single name
    }
};