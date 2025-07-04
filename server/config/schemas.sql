CREATE TABLE public.students (
    id integer PRIMARY KEY,
    name character varying(100),
    roll_no character varying(20),
    branch character varying(50),
    pn_no character varying(20),
    hostel character varying(20),
    password character varying(100)
);

CREATE TABLE public.expenses (
    id integer PRIMARY KEY,
    hostel character varying(20),
    month integer,
    year integer,
    total_amount numeric(10,2)
);

CREATE TABLE public.news (
    id integer PRIMARY KEY,
    text text
);

CREATE TABLE public.enquiries (
    id integer PRIMARY KEY,
    name character varying(100),
    email character varying(100),
    phone character varying(20),
    subject character varying(200),
    message text,
    status character varying(20),
    student_id integer REFERENCES students(id)
);

CREATE TABLE public.complaints (
    id integer PRIMARY KEY,
    student_id integer NOT NULL REFERENCES students(id),
    complaint_text text,
    status character varying(20)
);

CREATE TABLE public.caretakers (
    id integer PRIMARY KEY,
    name character varying(100),
    email character varying(100),
    password character varying(100)
);

CREATE TABLE public.bills (
    id integer PRIMARY KEY,
    student_id integer,
    month integer,
    year integer,
    amount numeric(10,2),
    payment_status character varying(20),
    payment_date timestamp without time zone
);

CREATE TABLE public.attendance (
    id integer PRIMARY KEY,
    student_id integer,
    month integer,
    year integer,
    present_days integer
);

CREATE TABLE public.administrators (
    id integer PRIMARY KEY,
    name character varying(100),
    email character varying(100),
    password character varying(100)
); 