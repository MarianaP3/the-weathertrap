import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { getLocations } from "@/lib/LocationService"
import { useAuthSession } from "@/hooks/useAuthSession"
import { createEvent } from "@/lib/EventService"
import { getWeatherForecast } from "@/lib/WeatherForecastService"

export default function Calendar({ showModal }) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const searchValue = useDebounce(searchTerm, 500)
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [currentForecast, setCurrentForecast] = useState({})

  const handleLocationSelect = (e) => {
    console.log({ e })
  }

  useEffect(() => {
    if (searchValue) {
      // Implement search logic here
      getLocations({ term: searchValue }).then((data) => {
        if (data && data.features) {
          const locationsFeatures = data.features
          setLocations(locationsFeatures)
        } else {
          setLocations([])
        }
      })

    }
  }, [searchValue])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const [weatherForecast, setWeatherForecast] = useState([])
  useEffect(() => {
    const location = navigator.geolocation
    location.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      getWeatherForecast({ lat: latitude, long: longitude }).then((data) => {
        setWeatherForecast(data.forecasts || [])
      })


    })
  }, [])

  useEffect(() => {
    // After the calendar is rendered add event listener to add click on each .fc-day
    const dayCells = document.querySelectorAll(".fc-day")
    dayCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const dateString = cell.getAttribute("data-date")
        const date = new Date(dateString)
        setSelectedDate(date)
        const selectedDateElement = document.getElementById("selected-date")
        if (selectedDateElement) {
          selectedDateElement.textContent = `${date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          })}`
        }
        const forecast = weatherForecast.find((forecast) => {
          const forecastDate = new Date(forecast.date)
          return (
            forecastDate.getDate() === date.getDate() &&
            forecastDate.getMonth() === date.getMonth() &&
            forecastDate.getFullYear() === date.getFullYear()
          )
        })
        if (forecast) {
          setCurrentForecast(forecast)
        } else {
          setCurrentForecast({})
        }
      })
    })



    const newEventButton = document.getElementById("new-event-button")
    if (newEventButton) {
      newEventButton.addEventListener("click", () => {
        setOpen(true)
      })
    }

    // Cleanup event listeners on unmount
    return () => {
      dayCells.forEach((cell) => {
        cell.removeEventListener("click", () => { })
      })
    }
  }, [weatherForecast])


  const { session } = useAuthSession()

  const onSave = () => {
    const [lat, long] = document.getElementById("locations").innerText.split(" ") || []
    createEvent({
      user_id: session?.user.id || "",
      description: document.getElementById("description")?.value || "",
      date: selectedDate.toISOString(),
      lat,
      long
    }).then((data) => {
      setOpen(false)
    })
  }

  useEffect(() => {
    if (currentForecast) {
      document.getElementById("air-quality").textContent = "Calidad del aire: " + (currentForecast?.airAndPollen?.at(0)?.category || "N/A")
      document.getElementById("feels-like").textContent = "Sensación térmica: Min " + (currentForecast?.realFeelTemperature?.minimum?.value || "N/A") + "°C" +
        " - Max " + (currentForecast?.realFeelTemperature?.maximum?.value || "N/A") + "°C"
      document.getElementById("uv-index").textContent = "Índice UV: " + (currentForecast?.airAndPollen?.at(-1)?.category || "N/A")
    }
    document.getElementById("wind").textContent = "Viento: " + (currentForecast.day?.wind?.speed?.value || "N/A") + " km/h"
    document.getElementById("sunset").textContent = "Horas de sol: " + ((currentForecast?.hoursOfSun) || "N/A") + "hrs"

    document.getElementById("precipitation").textContent = "Precipitación: " + (currentForecast?.day?.precipitationProbability || "N/A") + "%"

    document.getElementById("visibility").textContent = "Visibilidad: " + (currentForecast?.day?.cloudCover || "N/A") + " km"
  }, [currentForecast])

  return (
    <>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-white">Crear Evento</DialogTitle>
          </DialogHeader>
          <FieldSet className="text-white">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="date">Fecha del evento</FieldLabel>
                <Input id="date" autoComplete="off" placeholder="Selecciona una fecha"
                  value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""} type="date" disabled />
              </Field>
              <Field>
                <FieldLabel htmlFor="hour">Hora del evento</FieldLabel>
                <Input id="hour" autoComplete="off" placeholder="Selecciona una hora" type="time" defaultValue="12:00" />
              </Field>
              <Field>
                <FieldLabel htmlFor="location">Ubicación</FieldLabel>
                <Input id="location" autoComplete="off" type="search" list="locations" onChange={handleSearchChange} />
                <datalist id="locations">
                  {locations.map((loc) => (
                    <option key={loc.properties.address.formattedAddress} value={loc.properties.address.formattedAddress} >
                      {`${loc.geometry.coordinates.at(0)} ${loc.geometry.coordinates.at(1)}`}
                    </option>
                  ))}
                </datalist>
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Descripción</FieldLabel>
                <FieldContent>
                  <textarea id="description" className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm" rows={3} />
                </FieldContent>
              </Field>
              <Button className="mt-4 w-full" onClick={onSave}>Guardar Evento</Button>
            </FieldGroup>
          </FieldSet>
        </DialogContent>
      </Dialog >
    </>
  )
}
