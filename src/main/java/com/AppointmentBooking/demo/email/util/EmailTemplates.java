package com.AppointmentBooking.demo.email.util;

import com.AppointmentBooking.demo.entity.Appointment;

public class EmailTemplates {

    public static String bookedToProvider(Appointment appt) {
        return """
                Hello %s,

                A new appointment has been booked.

                Client: %s
                Date & Time: %s

                Please log in to accept or reject.

                Regards,
                Appointment App
                """.formatted(
                appt.getProvider().getName(),
                appt.getUser().getName(),
                appt.getStartTime()
        );
    }
    public static String bookedToUser(Appointment appt) {
        return """
                Hello %s,

                A new appointment has been booked.

                Provider: %s
                Date & Time: %s

                Please log in to accept or reject.

                Regards,
                Appointment App
                """.formatted(

                appt.getUser().getName(),
                appt.getProvider().getName(),
                appt.getStartTime()
        );
    }

    public static String confirmedToUser(Appointment appt) {
        return """
                Hello %s,

                Your appointment has been CONFIRMED.

                Provider: %s
                Date & Time: %s

                Regards,
                Appointment App
                """.formatted(
                appt.getUser().getName(),
                appt.getProvider().getName(),
                appt.getStartTime()
        );
    }
    public static String completedToUser(Appointment appt) {
        return """
                Hello %s,

                Your appointment has been COMPLETED successfully.

                Provider: %s
                Date & Time: %s

                Thank you for using our service.

                Regards,
                Appointment App
                """.formatted(
                appt.getUser().getName(),
                appt.getProvider().getName(),
                appt.getStartTime()
        );
    }
    public static String cancelled(Appointment appt, boolean toProvider) {
        return toProvider ?
                """
                Hello %s,

                The following appointment has been CANCELLED.

                Client: %s
                Date & Time: %s

                Regards,
                Appointment App
                """.formatted(
                        appt.getProvider().getName(),
                        appt.getUser().getName(),
                        appt.getStartTime()
                )
                :
                """
                Hello %s,

                Your appointment has been CANCELLED.

                Provider: %s
                Date & Time: %s

                Regards,
                Appointment App
                """.formatted(
                        appt.getUser().getName(),
                        appt.getProvider().getName(),
                        appt.getStartTime()
                );
    }
    public static String rejectedToUser(Appointment appt) {
        return """
                Hello %s,

                Your appointment has been REJECTED.

                Provider: %s
                Date & Time: %s

                Regards,
                Appointment App
                """.formatted(
                appt.getUser().getName(),
                appt.getProvider().getName(),
                appt.getStartTime()
        );
    }
    public static String sendReminder(Appointment appointment){
        return """
        Hello %s,

        This is a reminder for your upcoming appointment.

        Provider: %s
        Date & Time: %s
        Duration: %d minutes

        Please be on time.

        Regards,
        Appointment Booking Team
        """.formatted(
                appointment.getUser().getName(),
                appointment.getProvider().getName(),
                appointment.getStartTime(),
                java.time.Duration.between(
                        appointment.getStartTime(),
                        appointment.getEndTime()
                ).toMinutes()
        );
    }

}
