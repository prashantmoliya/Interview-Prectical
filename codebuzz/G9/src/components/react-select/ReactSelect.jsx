import { components } from "react-select";
import useThemeMode from "../../hooks/useThemeMode";

// Image
// Light
import SelectedLight from "../../assets/images/selected-light.svg";
// Dark
import SelectedDark from "../../assets/images/selected-dark.svg";


// React-Select-Icon
export const SelectDropdownIndicator = (props) => {
    const ThemeMode = useThemeMode();

    return (
        <components.DropdownIndicator {...props}>
            <img src={ThemeMode ? SelectedLight : SelectedDark} alt="Arrow" className='img-fluid' draggable={false} />
        </components.DropdownIndicator>
    )
};
