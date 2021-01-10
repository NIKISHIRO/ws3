import React from "react";
// @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Booking from "./bookings";
import { requestBookingsByCode } from "../../api/api";
import { IBookingSuccess } from "../../api/api.types";


interface IState {
  hasBookedFlight: boolean;
  booking: IBookingSuccess | null;
}

const BookingsContainer = () => {
  const [state, setState] = React.useState<IState>({
    hasBookedFlight: false,
    booking: null,
  });
  const {
    booking,
    hasBookedFlight,
  } = state;

  React.useEffect(() => {
    const code = localStorage.getItem('bookingCode') || '';

    setState({
      ...state,
      hasBookedFlight: !!code,
    });

    setBookings(code);
  }, []);

  const setBookings = async (code: string) => {
    try {
      const { data } = await requestBookingsByCode(code);

      if ('error' in data) return;

      setState({
        ...state,
        hasBookedFlight: true,
        booking: data,
      });
    } catch (e) {
      NotificationManager.error('У вас нет забронированных рейсов.');

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  };

  return (
    <div>
      <NotificationContainer />
      {!hasBookedFlight &&
        <b>У вас нет забронированных рейсов. <br /> Вы будете переадрисованны на страницу бронирования через 3 сек.</b>
      }
      {booking &&
        <Booking
          booking={booking}
        />
      }
    </div>
  );
}

export default BookingsContainer;
