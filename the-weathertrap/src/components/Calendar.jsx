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

export default function Calendar({ showModal }) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const searchValue = useDebounce(searchTerm, 500)
  const [locations, setLocations] = useState([])

  useEffect(() => {
    if (searchValue) {
      console.log("Searching for:", searchValue)
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
  }, [])
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
              <Button className="mt-4 w-full">Guardar Evento</Button>
            </FieldGroup>
          </FieldSet>
        </DialogContent>
      </Dialog >
    </>
  )
}
