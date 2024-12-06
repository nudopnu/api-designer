import "strings"

#RegisterRequest: {
    username: string & strings.MinRunes(2) & strings.MaxRunes(20)
    password: string & strings.MinRunes(8) & strings.MaxRunes(32)
}
