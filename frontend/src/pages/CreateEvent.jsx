import { useState } from 'react';
import './CreateEvent.css';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaCalendar, FaTag, FaClock, FaInfoCircle, FaMoneyBillAlt, FaPercentage, FaRegBuilding, FaEdit, FaTicketAlt, FaArrowLeft } from 'react-icons/fa';
import moment from 'moment-timezone';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import CountryFlags from 'country-flag-icons/react/3x2'
import { server } from '../main';

const options = moment.tz.names().map((tz) => {
    return {
        value: tz,
        label: tz,
    };
});

const currencyOptions = [
    { value: 'USD', label: '$ - USD', symbol: '$', flag: <CountryFlags.US title="United States" /> },
    { value: 'EUR', label: '€ - EUR', symbol: '€', flag: <CountryFlags.EU title="European Union" /> },
    { value: 'JPY', label: '¥ - JPY', symbol: '¥', flag: <CountryFlags.JP title="Japan" /> },
    { value: 'GBP', label: '£ - GBP', symbol: '£', flag: <CountryFlags.GB title="United Kingdom" /> },
    { value: 'AUD', label: '$ - AUD', symbol: '$', flag: <CountryFlags.AU title="Australia" /> },
    { value: 'CAD', label: '$ - CAD', symbol: '$', flag: <CountryFlags.CA title="Canada" /> },
    { value: 'CHF', label: 'CHF - Swiss Franc', symbol: 'CHF', flag: <CountryFlags.CH title="Switzerland" /> },
    { value: 'CNY', label: '¥ - CNY', symbol: '¥', flag: <CountryFlags.CN title="China" /> },
    { value: 'INR', label: '₹ - INR', symbol: '₹', flag: <CountryFlags.IN title="India" /> },
    { value: 'ZAR', label: 'R - ZAR', symbol: 'R', flag: <CountryFlags.ZA title="South Africa" /> },
    { value: 'KRW', label: '₩ - KRW', symbol: '₩', flag: <CountryFlags.KR title="South Korea" /> },
    { value: 'TRY', label: '₺ - TRY', symbol: '₺', flag: <CountryFlags.TR title="Turkey" /> },
    { value: 'NZD', label: '$ - NZD', symbol: '$', flag: <CountryFlags.NZ title="New Zealand" /> },
    { value: 'BRL', label: 'R$ - BRL', symbol: 'R$', flag: <CountryFlags.BR title="Brazil" /> },
    { value: 'RUB', label: '₽ - RUB', symbol: '₽', flag: <CountryFlags.RU title="Russia" /> },
    { value: 'SGD', label: '$ - SGD', symbol: '$', flag: <CountryFlags.SG title="Singapore" /> },
    { value: 'PLN', label: 'zł - PLN', symbol: 'zł', flag: <CountryFlags.PL title="Poland" /> },
    { value: 'THB', label: '฿ - THB', symbol: '฿', flag: <CountryFlags.TH title="Thailand" /> },
    { value: 'NOK', label: 'kr - NOK', symbol: 'kr', flag: <CountryFlags.NO title="Norway" /> },
    { value: 'CZK', label: 'Kč - CZK', symbol: 'Kč', flag: <CountryFlags.CZ title="Czech Republic" /> },
    { value: 'DKK', label: 'kr - DKK', symbol: 'kr', flag: <CountryFlags.DK title="Denmark" /> },
    { value: 'HUF', label: 'Ft - HUF', symbol: 'Ft', flag: <CountryFlags.HU title="Hungary" /> },
    { value: 'ILS', label: '₪ - ILS', symbol: '₪', flag: <CountryFlags.IL title="Israel" /> },
    { value: 'MYR', label: 'RM - MYR', symbol: 'RM', flag: <CountryFlags.MY title="Malaysia" /> },
    { value: 'PHP', label: '₱ - PHP', symbol: '₱', flag: <CountryFlags.PH title="Philippines" /> },
    { value: 'SEK', label: 'kr - SEK', symbol: 'kr', flag: <CountryFlags.SE title="Sweden" /> },
    { value: 'MXN', label: '$ - MXN', symbol: '$', flag: <CountryFlags.MX title="Mexico" /> },
    { value: 'ARS', label: '$ - ARS', symbol: '$', flag: <CountryFlags.AR title="Argentina" /> },
    { value: 'CLP', label: '$ - CLP', symbol: '$', flag: <CountryFlags.CL title="Chile" /> },
    { value: 'COP', label: '$ - COP', symbol: '$', flag: <CountryFlags.CO title="Colombia" /> },
    { value: 'EGP', label: '£ - EGP', symbol: '£', flag: <CountryFlags.EG title="Egypt" /> },
    { value: 'IDR', label: 'Rp - IDR', symbol: 'Rp', flag: <CountryFlags.ID title="Indonesia" /> },
    { value: 'KWD', label: 'KD - KWD', symbol: 'KD', flag: <CountryFlags.KW title="Kuwait" /> },
    { value: 'NPR', label: '₨ - NPR', symbol: '₨', flag: <CountryFlags.NP title="Nepal" /> },
    { value: 'PEN', label: 'S/ - PEN', symbol: 'S/', flag: <CountryFlags.PE title="Peru" /> },
    { value: 'PKR', label: '₨ - PKR', symbol: '₨', flag: <CountryFlags.PK title="Pakistan" /> },
    { value: 'QAR', label: '﷼ - QAR', symbol: '﷼', flag: <CountryFlags.QA title="Qatar" /> },
    { value: 'SAR', label: '﷼ - SAR', symbol: '﷼', flag: <CountryFlags.SA title="Saudi Arabia" /> },
    { value: 'TWD', label: '$ - TWD', symbol: '$', flag: <CountryFlags.TW title="Taiwan" /> },
    { value: 'AED', label: 'د.إ - AED', symbol: 'د.إ', flag: <CountryFlags.AE title="United Arab Emirates" /> },
    { value: 'UYU', label: '$ - UYU', symbol: '$', flag: <CountryFlags.UY title="Uruguay" /> },
    { value: 'VND', label: '₫ - VND', symbol: '₫', flag: <CountryFlags.VN title="Vietnam" /> },
    { value: 'ZMW', label: 'ZK - ZMW', symbol: 'ZK', flag: <CountryFlags.ZM title="Zambia" /> },
    { value: 'ANG', label: 'ƒ - ANG', symbol: 'ƒ', flag: <CountryFlags.AW title="Netherlands Antilles" /> },
    { value: 'BHD', label: '.د.ب - BHD', symbol: '.د.ب', flag: <CountryFlags.BH title="Bahrain" /> },
    { value: 'BOB', label: '$b - BOB', symbol: '$b', flag: <CountryFlags.BO title="Bolivia" /> },
    { value: 'CRC', label: '₡ - CRC', symbol: '₡', flag: <CountryFlags.CR title="Costa Rica" /> },
    { value: 'DOP', label: '$ - DOP', symbol: '$', flag: <CountryFlags.DO title="Dominican Republic" /> },
    { value: 'FJD', label: '$ - FJD', symbol: '$', flag: <CountryFlags.FJ title="Fiji" /> },
    { value: 'GNF', label: 'Fr - GNF', symbol: 'Fr', flag: <CountryFlags.GN title="Guinea" /> },
    { value: 'HRK', label: 'kn - HRK', symbol: 'kn', flag: <CountryFlags.HR title="Croatia" /> },
    { value: 'ISK', label: 'kr - ISK', symbol: 'kr', flag: <CountryFlags.IS title="Iceland" /> },
    { value: 'JOD', label: 'JD - JOD', symbol: 'JD', flag: <CountryFlags.JO title="Jordan" /> },
    { value: 'KES', label: 'KSh - KES', symbol: 'KSh', flag: <CountryFlags.KE title="Kenya" /> },
    { value: 'LKR', label: '₨ - LKR', symbol: '₨', flag: <CountryFlags.LK title="Sri Lanka" /> },
    { value: 'MAD', label: 'د.م. - MAD', symbol: 'د.م.', flag: <CountryFlags.MA title="Morocco" /> },
    { value: 'MMK', label: 'K - MMK', symbol: 'K', flag: <CountryFlags.MM title="Myanmar" /> },
    { value: 'NAD', label: '$ - NAD', symbol: '$', flag: <CountryFlags.NA title="Namibia" /> },
    { value: 'OMR', label: 'ر.ع. - OMR', symbol: 'ر.ع.', flag: <CountryFlags.OM title="Oman" /> },
    { value: 'PYG', label: '₲ - PYG', symbol: '₲', flag: <CountryFlags.PY title="Paraguay" /> },
    { value: 'RSD', label: 'дин. - RSD', symbol: 'дин.', flag: <CountryFlags.RS title="Serbia" /> },
    { value: 'BBD', label: '$ - BBD', symbol: '$', flag: <CountryFlags.BB title="Barbados" /> },
    { value: 'BZD', label: 'BZ$ - BZD', symbol: 'BZ$', flag: <CountryFlags.BZ title="Belize" /> },
    { value: 'CDF', label: 'Fr - CDF', symbol: 'Fr', flag: <CountryFlags.CD title="Democratic Republic of the Congo" /> },
    { value: 'DJF', label: 'Fr - DJF', symbol: 'Fr', flag: <CountryFlags.DJ title="Djibouti" /> },
    { value: 'ETB', label: 'Br - ETB', symbol: 'Br', flag: <CountryFlags.ET title="Ethiopia" /> },
    { value: 'GMD', label: 'D - GMD', symbol: 'D', flag: <CountryFlags.GM title="Gambia" /> },
    { value: 'HTG', label: 'G - HTG', symbol: 'G', flag: <CountryFlags.HT title="Haiti" /> },
    { value: 'IQD', label: 'ع.د - IQD', symbol: 'ع.د', flag: <CountryFlags.IQ title="Iraq" /> },
    { value: 'JMD', label: '$ - JMD', symbol: '$', flag: <CountryFlags.JM title="Jamaica" /> },
    { value: 'KHR', label: '៛ - KHR', symbol: '៛', flag: <CountryFlags.KH title="Cambodia" /> },
    { value: 'KPW', label: '₩ - KPW', symbol: '₩', flag: <CountryFlags.KP title="North Korea" /> },
    { value: 'LAK', label: '₭ - LAK', symbol: '₭', flag: <CountryFlags.LA title="Laos" /> },
    { value: 'LSL', label: 'L - LSL', symbol: 'L', flag: <CountryFlags.LS title="Lesotho" /> },
    { value: 'MDL', label: 'L - MDL', symbol: 'L', flag: <CountryFlags.MD title="Moldova" /> },
    { value: 'MRO', label: 'UM - MRO', symbol: 'UM', flag: <CountryFlags.MR title="Mauritania" /> },
    { value: 'MVR', label: 'ރ. - MVR', symbol: 'ރ.', flag: <CountryFlags.MV title="Maldives" /> },
    { value: 'NIO', label: 'C$ - NIO', symbol: 'C$', flag: <CountryFlags.NI title="Nicaragua" /> },
    { value: 'PGK', label: 'K - PGK', symbol: 'K', flag: <CountryFlags.PG title="Papua New Guinea" /> },
    { value: 'RWF', label: 'Fr - RWF', symbol: 'Fr', flag: <CountryFlags.RW title="Rwanda" /> },
    { value: 'SZL', label: 'E - SZL', symbol: 'E', flag: <CountryFlags.SZ title="Eswatini" /> },
    { value: 'BBD', label: '$ - BBD', symbol: '$', flag: <CountryFlags.BB title="Barbados" /> },
    { value: 'BZD', label: 'BZ$ - BZD', symbol: 'BZ$', flag: <CountryFlags.BZ title="Belize" /> },
    { value: 'CDF', label: 'Fr - CDF', symbol: 'Fr', flag: <CountryFlags.CD title="Democratic Republic of the Congo" /> },
    { value: 'DJF', label: 'Fr - DJF', symbol: 'Fr', flag: <CountryFlags.DJ title="Djibouti" /> },
    { value: 'ETB', label: 'Br - ETB', symbol: 'Br', flag: <CountryFlags.ET title="Ethiopia" /> },
    { value: 'GMD', label: 'D - GMD', symbol: 'D', flag: <CountryFlags.GM title="Gambia" /> },
    { value: 'HTG', label: 'G - HTG', symbol: 'G', flag: <CountryFlags.HT title="Haiti" /> },
    { value: 'IQD', label: 'ع.د - IQD', symbol: 'ع.د', flag: <CountryFlags.IQ title="Iraq" /> },
    { value: 'JMD', label: '$ - JMD', symbol: '$', flag: <CountryFlags.JM title="Jamaica" /> },
    { value: 'KHR', label: '៛ - KHR', symbol: '៛', flag: <CountryFlags.KH title="Cambodia" /> },
    { value: 'KPW', label: '₩ - KPW', symbol: '₩', flag: <CountryFlags.KP title="North Korea" /> },
    { value: 'LAK', label: '₭ - LAK', symbol: '₭', flag: <CountryFlags.LA title="Laos" /> },
    { value: 'LSL', label: 'L - LSL', symbol: 'L', flag: <CountryFlags.LS title="Lesotho" /> },
    { value: 'MDL', label: 'L - MDL', symbol: 'L', flag: <CountryFlags.MD title="Moldova" /> },
    { value: 'MRO', label: 'UM - MRO', symbol: 'UM', flag: <CountryFlags.MR title="Mauritania" /> },
    { value: 'MVR', label: 'ރ. - MVR', symbol: 'ރ.', flag: <CountryFlags.MV title="Maldives" /> },
    { value: 'NIO', label: 'C$ - NIO', symbol: 'C$', flag: <CountryFlags.NI title="Nicaragua" /> },
    { value: 'PGK', label: 'K - PGK', symbol: 'K', flag: <CountryFlags.PG title="Papua New Guinea" /> },
    { value: 'RWF', label: 'Fr - RWF', symbol: 'Fr', flag: <CountryFlags.RW title="Rwanda" /> },
    { value: 'SZL', label: 'E - SZL', symbol: 'E', flag: <CountryFlags.SZ title="Eswatini" /> },
    { value: 'TMT', label: 'T - TMT', symbol: 'T', flag: <CountryFlags.TM title="Turkmenistan" /> },
    { value: 'UGX', label: 'USh - UGX', symbol: 'USh', flag: <CountryFlags.UG title="Uganda" /> },
    { value: 'UZS', label: 'лв - UZS', symbol: 'лв', flag: <CountryFlags.UZ title="Uzbekistan" /> },
    { value: 'XAF', label: 'Fr - XAF', symbol: 'Fr', flag: <CountryFlags.CM title="Cameroon" /> },
    { value: 'XOF', label: 'Fr - XOF', symbol: 'Fr', flag: <CountryFlags.SN title="Senegal" /> },
    { value: 'XPF', label: 'Fr - XPF', symbol: 'Fr', flag: <CountryFlags.PF title="French Polynesia" /> },
    { value: 'YER', label: '﷼ - YER', symbol: '﷼', flag: <CountryFlags.YE title="Yemen" /> },
    { value: 'AFN', label: '؋ - AFN', symbol: '؋', flag: <CountryFlags.AF title="Afghanistan" /> },
    { value: 'ALL', label: 'L - ALL', symbol: 'L', flag: <CountryFlags.AL title="Albania" /> },
    { value: 'AMD', label: '֏ - AMD', symbol: '֏', flag: <CountryFlags.AM title="Armenia" /> },
    { value: 'AOA', label: 'Kz - AOA', symbol: 'Kz', flag: <CountryFlags.AO title="Angola" /> },
    { value: 'AZN', label: '₼ - AZN', symbol: '₼', flag: <CountryFlags.AZ title="Azerbaijan" /> },
    { value: 'BAM', label: 'KM - BAM', symbol: 'KM', flag: <CountryFlags.BA title="Bosnia and Herzegovina" /> },
    { value: 'BGN', label: 'лв - BGN', symbol: 'лв', flag: <CountryFlags.BG title="Bulgaria" /> },
    { value: 'BIF', label: 'Fr - BIF', symbol: 'Fr', flag: <CountryFlags.BI title="Burundi" /> },
    { value: 'KHR', label: '៛ - KHR', symbol: '៛', flag: <CountryFlags.KH title="Cambodia" /> },
    { value: 'CVE', label: 'Esc - CVE', symbol: 'Esc', flag: <CountryFlags.CV title="Cape Verde" /> },
    { value: 'DZD', label: 'د.ج - DZD', symbol: 'د.ج', flag: <CountryFlags.DZ title="Algeria" /> },
    { value: 'ERN', label: 'Nfk - ERN', symbol: 'Nfk', flag: <CountryFlags.ER title="Eritrea" /> },
    { value: 'FJD', label: '$ - FJD', symbol: '$', flag: <CountryFlags.FJ title="Fiji" /> },
    { value: 'GHS', label: '₵ - GHS', symbol: '₵', flag: <CountryFlags.GH title="Ghana" /> },
    { value: 'GIP', label: '£ - GIP', symbol: '£', flag: <CountryFlags.GI title="Gibraltar" /> },
    { value: 'GTQ', label: 'Q - GTQ', symbol: 'Q', flag: <CountryFlags.GT title="Guatemala" /> },
    { value: 'GYD', label: '$ - GYD', symbol: '$', flag: <CountryFlags.GY title="Guyana" /> },
    { value: 'HNL', label: 'L - HNL', symbol: 'L', flag: <CountryFlags.HN title="Honduras" /> },
    { value: 'HRK', label: 'kn - HRK', symbol: 'kn', flag: <CountryFlags.HR title="Croatia" /> },
    { value: 'ISK', label: 'kr - ISK', symbol: 'kr', flag: <CountryFlags.IS title="Iceland" /> },
    { value: 'JMD', label: '$ - JMD', symbol: '$', flag: <CountryFlags.JM title="Jamaica" /> },
    { value: 'JOD', label: 'JD - JOD', symbol: 'JD', flag: <CountryFlags.JO title="Jordan" /> },
    { value: 'KES', label: 'KSh - KES', symbol: 'KSh', flag: <CountryFlags.KE title="Kenya" /> },
    { value: 'KGS', label: 'лв - KGS', symbol: 'лв', flag: <CountryFlags.KG title="Kyrgyzstan" /> },
    { value: 'KMF', label: 'Fr - KMF', symbol: 'Fr', flag: <CountryFlags.KM title="Comoros" /> },
    { value: 'KPW', label: '₩ - KPW', symbol: '₩', flag: <CountryFlags.KP title="North Korea" /> },
    { value: 'KWD', label: 'KD - KWD', symbol: 'KD', flag: <CountryFlags.KW title="Kuwait" /> },
    { value: 'KYD', label: '$ - KYD', symbol: '$', flag: <CountryFlags.KY title="Cayman Islands" /> },
    { value: 'KZT', label: '₸ - KZT', symbol: '₸', flag: <CountryFlags.KZ title="Kazakhstan" /> },
    { value: 'LAK', label: '₭ - LAK', symbol: '₭', flag: <CountryFlags.LA title="Laos" /> },
    { value: 'LBP', label: 'ل.ل - LBP', symbol: 'ل.ل', flag: <CountryFlags.LB title="Lebanon" /> },
    { value: 'LKR', label: '₨ - LKR', symbol: '₨', flag: <CountryFlags.LK title="Sri Lanka" /> },
    { value: 'LRD', label: '$ - LRD', symbol: '$', flag: <CountryFlags.LR title="Liberia" /> },
    { value: 'LSL', label: 'L - LSL', symbol: 'L', flag: <CountryFlags.LS title="Lesotho" /> },
    { value: 'LYD', label: 'ل.د - LYD', symbol: 'ل.د', flag: <CountryFlags.LY title="Libya" /> },
    { value: 'MAD', label: 'د.م. - MAD', symbol: 'د.م.', flag: <CountryFlags.MA title="Morocco" /> },
    { value: 'MDL', label: 'L - MDL', symbol: 'L', flag: <CountryFlags.MD title="Moldova" /> },
    { value: 'MGA', label: 'Ar - MGA', symbol: 'Ar', flag: <CountryFlags.MG title="Madagascar" /> },
    { value: 'MKD', label: 'ден - MKD', symbol: 'ден', flag: <CountryFlags.MK title="North Macedonia" /> },
    { value: 'MMK', label: 'K - MMK', symbol: 'K', flag: <CountryFlags.MM title="Myanmar" /> },
    { value: 'MNT', label: '₮ - MNT', symbol: '₮', flag: <CountryFlags.MN title="Mongolia" /> },
    { value: 'MOP', label: 'P - MOP', symbol: 'P', flag: <CountryFlags.MO title="Macau" /> },
    { value: 'MRU', label: 'UM - MRU', symbol: 'UM', flag: <CountryFlags.MR title="Mauritania" /> },
    { value: 'MUR', label: '₨ - MUR', symbol: '₨', flag: <CountryFlags.MU title="Mauritius" /> },
    { value: 'MVR', label: 'ރ. - MVR', symbol: 'ރ.', flag: <CountryFlags.MV title="Maldives" /> },
    { value: 'MWK', label: 'MK - MWK', symbol: 'MK', flag: <CountryFlags.MW title="Malawi" /> },
    { value: 'MXN', label: '$ - MXN', symbol: '$', flag: <CountryFlags.MX title="Mexico" /> },
    { value: 'MYR', label: 'RM - MYR', symbol: 'RM', flag: <CountryFlags.MY title="Malaysia" /> },
    { value: 'MZN', label: 'MT - MZN', symbol: 'MT', flag: <CountryFlags.MZ title="Mozambique" /> },
    { value: 'NAD', label: '$ - NAD', symbol: '$', flag: <CountryFlags.NA title="Namibia" /> },
    { value: 'NGN', label: '₦ - NGN', symbol: '₦', flag: <CountryFlags.NG title="Nigeria" /> },
    { value: 'NIO', label: 'C$ - NIO', symbol: 'C$', flag: <CountryFlags.NI title="Nicaragua" /> },
    { value: 'NOK', label: 'kr - NOK', symbol: 'kr', flag: <CountryFlags.NO title="Norway" /> },
    { value: 'NPR', label: '₨ - NPR', symbol: '₨', flag: <CountryFlags.NP title="Nepal" /> },
    { value: 'NZD', label: '$ - NZD', symbol: '$', flag: <CountryFlags.NZ title="New Zealand" /> },
    { value: 'OMR', label: 'ر.ع. - OMR', symbol: 'ر.ع.', flag: <CountryFlags.OM title="Oman" /> },
    { value: 'PAB', label: 'B/. - PAB', symbol: 'B/.', flag: <CountryFlags.PA title="Panama" /> },
    { value: 'PEN', label: 'S/ - PEN', symbol: 'S/', flag: <CountryFlags.PE title="Peru" /> },
    { value: 'PGK', label: 'K - PGK', symbol: 'K', flag: <CountryFlags.PG title="Papua New Guinea" /> },
    { value: 'PHP', label: '₱ - PHP', symbol: '₱', flag: <CountryFlags.PH title="Philippines" /> },
    { value: 'PKR', label: '₨ - PKR', symbol: '₨', flag: <CountryFlags.PK title="Pakistan" /> },
    { value: 'PLN', label: 'zł - PLN', symbol: 'zł', flag: <CountryFlags.PL title="Poland" /> },
    { value: 'PYG', label: '₲ - PYG', symbol: '₲', flag: <CountryFlags.PY title="Paraguay" /> },
    { value: 'QAR', label: '﷼ - QAR', symbol: '﷼', flag: <CountryFlags.QA title="Qatar" /> },
    { value: 'RON', label: 'lei - RON', symbol: 'lei', flag: <CountryFlags.RO title="Romania" /> },
    { value: 'RSD', label: 'дин. - RSD', symbol: 'дин.', flag: <CountryFlags.RS title="Serbia" /> },
    { value: 'RUB', label: '₽ - RUB', symbol: '₽', flag: <CountryFlags.RU title="Russia" /> },
    { value: 'RWF', label: 'Fr - RWF', symbol: 'Fr', flag: <CountryFlags.RW title="Rwanda" /> },
    { value: 'SAR', label: '﷼ - SAR', symbol: '﷼', flag: <CountryFlags.SA title="Saudi Arabia" /> },
    { value: 'SBD', label: '$ - SBD', symbol: '$', flag: <CountryFlags.SB title="Solomon Islands" /> },
    { value: 'SCR', label: '₨ - SCR', symbol: '₨', flag: <CountryFlags.SC title="Seychelles" /> },
    { value: 'SDG', label: 'ج.س. - SDG', symbol: 'ج.س.', flag: <CountryFlags.SD title="Sudan" /> },
    { value: 'SEK', label: 'kr - SEK', symbol: 'kr', flag: <CountryFlags.SE title="Sweden" /> },
    { value: 'SGD', label: '$ - SGD', symbol: '$', flag: <CountryFlags.SG title="Singapore" /> },
    { value: 'SHP', label: '£ - SHP', symbol: '£', flag: <CountryFlags.SH title="Saint Helena" /> },
    { value: 'SLL', label: 'Le - SLL', symbol: 'Le', flag: <CountryFlags.SL title="Sierra Leone" /> },
    { value: 'SOS', label: 'S - SOS', symbol: 'S', flag: <CountryFlags.SO title="Somalia" /> },
    { value: 'SRD', label: '$ - SRD', symbol: '$', flag: <CountryFlags.SR title="Suriname" /> },
    { value: 'SSP', label: '£ - SSP', symbol: '£', flag: <CountryFlags.SS title="South Sudan" /> },
    { value: 'STN', label: 'Db - STN', symbol: 'Db', flag: <CountryFlags.ST title="São Tomé and Príncipe" /> },
    { value: 'SYP', label: '£ - SYP', symbol: '£', flag: <CountryFlags.SY title="Syria" /> },
    { value: 'SZL', label: 'E - SZL', symbol: 'E', flag: <CountryFlags.SZ title="Eswatini" /> },
    { value: 'THB', label: '฿ - THB', symbol: '฿', flag: <CountryFlags.TH title="Thailand" /> },
    { value: 'TJS', label: 'ЅМ - TJS', symbol: 'ЅМ', flag: <CountryFlags.TJ title="Tajikistan" /> },
    { value: 'TMT', label: 'T - TMT', symbol: 'T', flag: <CountryFlags.TM title="Turkmenistan" /> },
    { value: 'TND', label: 'د.ت - TND', symbol: 'د.ت', flag: <CountryFlags.TN title="Tunisia" /> },
    { value: 'TOP', label: 'T$ - TOP', symbol: 'T$', flag: <CountryFlags.TO title="Tonga" /> },

];

const categories = ['Music', 'Sports', 'Technology', 'Education', 'Arts'];

const CreateEvent = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [detailedInfo, setDetailedInfo] = useState('');
    const [venue, setVenue] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [discountCoupon, setDiscountCoupon] = useState('');
    const [hasSubmittedStepOne, setHasSubmittedStepOne] = useState(false);
    const [hasSubmittedStepTwo, setHasSubmittedStepTwo] = useState(false);
    const [isChoosingDateRange, setIsChoosingDateRange] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([{ date: '', startTime: '', endTime: '' }]);
    const [selectedTimezone, setSelectedTimezone] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
    const [price, setPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const validateStepOne = () => {
        return (
            name !== '' &&
            description !== '' &&
            detailedInfo !== '' &&
            venue !== ''
        );
    };

    const validateStepTwo = () => {
        const isValidPrice = parseFloat(price) >= 0;
        const isValidSalePrice = parseFloat(salePrice) >= 0;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let isValidTimeSlots = true;
        let isValidDateRange = true;

        if (isChoosingDateRange) {
            const selectedStartDate = new Date(startDate);
            selectedStartDate.setHours(0, 0, 0, 0);

            const selectedEndDate = new Date(endDate);
            selectedEndDate.setHours(0, 0, 0, 0);

            isValidDateRange = (
                selectedStartDate >= currentDate &&
                selectedEndDate >= currentDate &&
                selectedEndDate >= selectedStartDate
            );
        } else {
            isValidTimeSlots = timeSlots.every((timeSlot) => {
                const selectedDate = new Date(timeSlot.date);
                selectedDate.setHours(0, 0, 0, 0);

                const hasStartTime = timeSlot.startTime !== '';
                const hasEndTime = timeSlot.endTime !== '';

                return (
                    selectedDate >= currentDate &&
                    (hasStartTime || hasEndTime)
                );
            });
        }

        return category !== null && isValidPrice && isValidSalePrice && isValidTimeSlots && isValidDateRange;
    };



    const validateStepThree = () => {
        return true;
    };

    const handleCreateEvent = async (event) => {
        event.preventDefault();

        const eventData = {
            name: name,
            description: description,
            detailedInfo: detailedInfo,
            venue: venue,
            category: category,
            isChoosingDateRange: isChoosingDateRange,
            startDate: startDate,
            endDate: endDate,
            timeSlots: timeSlots,
            selectedTimezone: selectedTimezone,
            selectedCurrency: selectedCurrency,
            price: price,
            salePrice: salePrice,
            discountCoupon: discountCoupon,
        };

        try {
            const response = await fetch(`${server}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                // reset the form or redirect user after successful post
            }

        } catch (error) {
            console.log(error);
            // handle error response
        }
    }

    const onSubmitStepOne = (e) => {
        e.preventDefault();
        if (validateStepOne()) {
            setStep(2);
        } else {
            setHasSubmittedStepOne(true);
        }
    };

    const onSubmitStepTwo = (e) => {
        e.preventDefault();
        if (validateStepTwo()) {
            setStep(3);
        } else {
            setHasSubmittedStepTwo(true);
        }
    };

    const onSubmitStepThree = async (e) => {
        e.preventDefault();
        if (validateStepThree()) {
            try {
                // Submit the form data to the server
                await handleCreateEvent(e);

                // Reset the form only if the data was submitted successfully
                setStep(1);
                setHasSubmittedStepOne(false);
                setHasSubmittedStepTwo(false);
            } catch (error) {
                // Handle any errors during submission
                console.error("Failed to create event", error);
            }
        }
    };

    const progress = (step - 1) * 33.33;

    const handleDateRangeSelection = (e) => {
        const { value } = e.target;
        if (value === 'dateRange') {
            setIsChoosingDateRange(true);
            setStartDate('');
            setEndDate('');
        } else {
            setIsChoosingDateRange(false);
            setTimeSlots([{ date: '', startTime: '', endTime: '' }]);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleDateChange = (index, e) => {
        const { value } = e.target;
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].date = value;
        setTimeSlots(newTimeSlots);
    };

    const handleStartTimeChange = (index, e) => {
        const { value } = e.target;
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].startTime = value;
        setTimeSlots(newTimeSlots);
    };

    const handleEndTimeChange = (index, e) => {
        const { value } = e.target;
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].endTime = value;
        setTimeSlots(newTimeSlots);
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { date: '', startTime: '', endTime: '' }]);
    };

    const goToPreviousStep = () => {
        setStep(step => step - 1);
    };


    return (
        <div id="create-event-page">
            <a href="/" className="back-arrow"><FaArrowLeft size={30} /></a>
            <div className="create-event-container">
                <div className="slider-ctr">
                    {step > 1 && (
                        <button className="btn btn-secondary mb-4" onClick={goToPreviousStep}>
                            <FaArrowLeft /> Back
                        </button>
                    )}
                    {step === 1 && (
                        <form onSubmit={onSubmitStepOne} className="slider-form slider-one">
                            <ProgressBar now={progress} variant="warning" striped className='mb-4' />
                            <h2>Enter Event Details</h2>
                            <label htmlFor="name"><FaTicketAlt /> Event Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter event name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="description"><FaEdit /> Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter event description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="detailed-info"><FaInfoCircle /> Detailed Info</label>
                            <textarea
                                id="detailed-info"
                                placeholder="Enter detailed information"
                                value={detailedInfo}
                                onChange={(e) => setDetailedInfo(e.target.value)}
                            />
                            <label htmlFor="venue"><FaRegBuilding /> Venue</label>
                            <input
                                type="text"
                                id="venue"
                                placeholder="Enter event venue"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />
                            {hasSubmittedStepOne && !validateStepOne() && (
                                <Alert variant="danger">Please fill all the fields in Step 1</Alert>
                            )}
                            <button>Next Step</button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={onSubmitStepTwo} className="slider-form slider-two">
                            <ProgressBar now={progress} variant="warning" striped className='mb-4' />
                            <h2>Additional Event Details</h2>
                            <label htmlFor="category"><FaTag /> Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                            <label htmlFor="date-selection"><FaCalendar /> Date Selection</label>
                            <select
                                id="date-selection"
                                value={isChoosingDateRange ? 'dateRange' : 'individualDates'}
                                onChange={handleDateRangeSelection}
                            >
                                <option value="dateRange">Choose Date Range</option>
                                <option value="individualDates">Add Individual Dates</option>
                            </select>
                            {isChoosingDateRange && (
                                <div className="date-range-input">
                                    <div className="date-input">
                                        <label htmlFor="start-date"><FaCalendar /> Start Date</label>
                                        <input
                                            type="date"
                                            id="start-date"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                        />
                                    </div>
                                    <div className="date-input">
                                        <label htmlFor="end-date"><FaCalendar /> End Date</label>
                                        <input
                                            type="date"
                                            id="end-date"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {!isChoosingDateRange && (
                                <>
                                    {timeSlots.map((timeSlot, index) => (
                                        <div key={index} className="time-slot-container">
                                            <div className="time-slot-input">
                                                <label htmlFor={`date-${index}`}><FaCalendar /> Date</label>
                                                <input
                                                    type="date"
                                                    id={`date-${index}`}
                                                    value={timeSlot.date}
                                                    onChange={(e) => handleDateChange(index, e)}
                                                />
                                            </div>
                                            <div className="time-slot-input">
                                                <label htmlFor={`start-time-${index}`}><FaClock /> Start Time</label>
                                                <input
                                                    type="time"
                                                    id={`start-time-${index}`}
                                                    value={timeSlot.startTime}
                                                    onChange={(e) => handleStartTimeChange(index, e)}
                                                />
                                            </div>
                                            <div className="time-slot-input">
                                                <label htmlFor={`end-time-${index}`}><FaClock /> End Time</label>
                                                <input
                                                    type="time"
                                                    id={`end-time-${index}`}
                                                    value={timeSlot.endTime}
                                                    onChange={(e) => handleEndTimeChange(index, e)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addTimeSlot}>
                                        Add more time slot
                                    </button>
                                </>
                            )}
                            <label htmlFor="timezone"><FaClock /> Timezone</label>
                            <Select
                                id="timezone"
                                options={options}
                                isSearchable
                                value={selectedTimezone}
                                onChange={(selectedOption) => setSelectedTimezone(selectedOption)}
                            />
                            <label htmlFor="currency"><FaMoneyBillAlt /> Currency</label>
                            <Select
                                id="currency"
                                options={currencyOptions}
                                isSearchable
                                value={selectedCurrency}
                                formatOptionLabel={(option) => (
                                    <div className="currency-option">
                                        <div className='d-flex'>
                                            {option.label}
                                            <div className="currency-flag">
                                                {option.flag}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                onChange={(selectedOption) => setSelectedCurrency(selectedOption)}
                            />
                            <label htmlFor="price"><FaMoneyBillAlt /> Price</label>
                            <CurrencyInput
                                id="price"
                                value={price}
                                decimalsLimit={2}
                                prefix={selectedCurrency.symbol}
                                onValueChange={(val) => setPrice(val)}
                            />
                            <label htmlFor="sale-price"><FaMoneyBillAlt /> Sale Price</label>
                            <CurrencyInput
                                id="sale-price"
                                value={salePrice}
                                decimalsLimit={2}
                                prefix={selectedCurrency.symbol}
                                onValueChange={(val) => setSalePrice(val)}
                            />
                            {hasSubmittedStepTwo && !validateStepTwo() && (
                                <Alert variant="danger">Please fill all the fields in Step 2</Alert>
                            )}
                            <button>Next Step</button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={onSubmitStepThree} className="slider-form slider-three">
                            <ProgressBar now={progress} variant="warning" striped className='mb-4' />

                            <h2>Enter Discount Coupon</h2>
                            <label htmlFor="discount-coupon"><FaPercentage /> Discount Coupon</label>
                            <input
                                type="text"
                                id="discount-coupon"
                                placeholder="Enter discount coupon"
                                value={discountCoupon}
                                onChange={(e) => setDiscountCoupon(e.target.value)}
                            />

                            <h2 className="review-section-title mt-5">Review Your Information</h2>
                            <div className="review-section">
                                <h3><FaTicketAlt /> {name}</h3>
                                <p><FaEdit /> {description}</p>
                                <p><FaInfoCircle /> {detailedInfo}</p>
                                <p><FaRegBuilding /> {venue}</p>
                                <p><FaTag /> {category}</p>
                                {isChoosingDateRange && (
                                    <>
                                        <p><FaCalendar /> Start Date: {startDate}</p>
                                        <p><FaCalendar /> End Date: {endDate}</p>
                                    </>
                                )}
                                {!isChoosingDateRange && (
                                    <>
                                        {timeSlots.map((timeSlot, index) => (
                                            <div key={index}>
                                                <p><FaCalendar /> {timeSlot.date}</p>
                                                <p><FaClock /> Start Time: {timeSlot.startTime}</p>
                                                <p><FaClock /> End Time: {timeSlot.endTime}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                                <p><FaMoneyBillAlt /> Price: {selectedCurrency.symbol} {price}</p>
                                <p><FaMoneyBillAlt /> Sale Price: {selectedCurrency.symbol} {salePrice}</p>
                            </div>

                            <button>Submit Event</button>
                        </form>
                    )}
                </div>
            </div>
            <footer className='text-center mt-5'>
                &copy; Copyright 2023 EventHub. All rights reserved.
            </footer>
        </div>
    );
};

export default CreateEvent;
