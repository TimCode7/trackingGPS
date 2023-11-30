--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Ubuntu 16.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coordonnees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coordonnees (
    id integer NOT NULL,
    latitude character varying(100),
    longitude character varying(100),
    key character varying(10)
);


ALTER TABLE public.coordonnees OWNER TO postgres;

--
-- Name: coordonnees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coordonnees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coordonnees_id_seq OWNER TO postgres;

--
-- Name: coordonnees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coordonnees_id_seq OWNED BY public.coordonnees.id;


--
-- Name: coordonnees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordonnees ALTER COLUMN id SET DEFAULT nextval('public.coordonnees_id_seq'::regclass);


--
-- Name: coordonnees coordonnees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coordonnees
    ADD CONSTRAINT coordonnees_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

