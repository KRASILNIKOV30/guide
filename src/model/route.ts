//curl 'http://router.project-osrm.org/route/v1/driving/56.6418,47.889690;56.641890,47.879654;56.741888,47.889612?overview=false'

const route = {
    "code": "Ok",
    "waypoints": [
        {
            "hint":"xWhTg9loU4OOCgAAWSsAAEUHAAC1OAAAnDo8REg8QUWvlAFEL5Z8RY4KAABZKwAARQcAALU4AACx6AAAYkhgA4jH2gIISWADGr3aAgEAvxA2mgAV",
            "distance":297.130571,
            "location":[56.641634,47.89236],
            "name":""
        },
        {
            "hint":"xWhTg9loU4MdCwAAyioAAEUHAAC1OAAAmy9GRAi_PkWvlAFEL5Z8RR0LAADKKgAARQcAALU4AACx6AAATkZgA3rH2gJiSWAD5pXaAgEAvxA2mgAV",
            "distance":1412.42401,
            "location":[56.641102,47.892346],
            "name":""
        },
        {
            "hint":"rWhTg8doU4NhAAAAlQIAALZBAACPIQAA3FWHQp9E5kMwATdGNv66RWEAAACVAgAAtkEAAI8hAACx6AAAZtNhA0rH2gIA0GEDzLzaAhgArxE2mgAV",
            "distance":305.659236,
            "location":[56.742758,47.892298],
            "name":""
        }
    ],
    "routes":[
        {
            "legs": [
                {
                    "steps":[],
                    "weight":14.3,
                    "distance":39.7,
                    "summary":"",
                    "duration":14.3
                },
                {
                    "steps":[],
                    "weight":4607.2,
                    "distance":21332.3,
                    "summary":"",
                    "duration":4607.2
                }
            ],
            "weight_name":"routability",
            "weight":4621.5,
            "distance":21372,
            "duration":4621.5
        }
    ]
}

export {route}