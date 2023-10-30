import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import CoffeeIcon from "@mui/icons-material/Coffee";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import HouseIcon from "@mui/icons-material/House";
import SoapIcon from "@mui/icons-material/Soap";
import SchoolIcon from "@mui/icons-material/School";
import RedeemIcon from "@mui/icons-material/Redeem";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

export const formatDate = (date) => {
  let objectDate = new Date(date);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  switch (month) {
    case 0:
      return `${day} January ${year}`;
    case 1:
      return `${day} February ${year}`;
    case 2:
      return `${day} March ${year}`;
    case 3:
      return `${day} April ${year}`;
    case 4:
      return `${day} May ${year}`;
    case 5:
      return `${day} June ${year}`;
    case 6:
      return `${day} July ${year}`;
    case 7:
      return `${day} August ${year}`;
    case 8:
      return `${day} September ${year}`;
    case 9:
      return `${day} October ${year}`;
    case 10:
      return `${day} November ${year}`;
    case 11:
      return `${day} December ${year}`;

    default:
      return "";
  }
};

export const showIcon = (category) => {
  switch (category) {
    case "food":
      return <BakeryDiningIcon />;
    case "coffee":
      return <CoffeeIcon />;
    case "charity":
      return <VolunteerActivismIcon />;
    case "clothing":
      return <CheckroomIcon />;
    case "housing":
      return <HouseIcon />;
    case "personal care":
      return <SoapIcon />;
    case "education":
      return <SchoolIcon />;
    case "gifts":
      return <RedeemIcon />;
    case "healthcare":
      return <HealthAndSafetyIcon />;
    case "travel":
      return <ConnectingAirportsIcon />;
    case "sport":
      return <SportsTennisIcon />;
    default:
      return "";
  }
};
