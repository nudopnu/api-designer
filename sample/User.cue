import "time"

#User: {
    id: int32
    name: string
    surname: string
    birthdate: time.Format("2006-01-02")
    verified: bool
    image_url: string
    created_at: time.Format(time.ANSIC)
    updated_at: time.Format(time.ANSIC)
}