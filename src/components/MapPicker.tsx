import { useRef } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

// Vite ??? Leaflet ?? marker ?????????????
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl })

const TAIWAN: [number, number] = [25.0478, 121.5319]

interface Props {
  lat?: number
  lng?: number
  onChange: (lat: number, lng: number) => void
}

function ClickHandler({ onPlace }: { onPlace: (lat: number, lng: number) => void }) {
  useMapEvents({ click: e => onPlace(e.latlng.lat, e.latlng.lng) })
  return null
}

function MapPicker({ lat, lng, onChange }: Props) {
  const markerRef = useRef<L.Marker>(null)
  const hasPosition = lat !== undefined && lng !== undefined && lat !== 0 && lng !== 0
  const center: [number, number] = hasPosition ? [lat, lng] : TAIWAN

  function handlePlace(newLat: number, newLng: number) {
    onChange(newLat, newLng)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="rounded-xl overflow-hidden border border-zinc-700"
        style={{ height: "280px" }}
      >
        <MapContainer
          center={center}
          zoom={hasPosition ? 14 : 11}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPlace={handlePlace} />
          {hasPosition && (
            <Marker
              position={[lat, lng]}
              ref={markerRef}
              draggable
              eventHandlers={{
                dragend() {
                  if (markerRef.current) {
                    const p = markerRef.current.getLatLng()
                    handlePlace(p.lat, p.lng)
                  }
                },
              }}
            />
          )}
        </MapContainer>
      </div>
      <p className="text-zinc-500 text-xs">
        {hasPosition
          ? `????${lat.toFixed(6)}, ${lng.toFixed(6)} ? ??? marker ??`
          : "??????????"}
      </p>
    </div>
  )
}

export default MapPicker