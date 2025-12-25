export default {
  controllers: {
    OBS: {
      scenes: [
        {
          name: "TransformGame1",
          gameSource: "game1",
          moveTransitionFilterName: "transform",
          filters: ["spin", "invert", "delay"],
          sources: ["spotlight", "dvd"]
        }
      ]
    }
  },
  listeners: [
    {
      name: "DonationFaker",
      listener: "ws",
      controller: "obs",
      address: "http://localhost:8080",
      options: {
        extraHeaders: {
          "Authorization": "Bearer abc123"
        },
        auth: {
          "token": "Bearer abc123"
        }
      },
      rules: [
        {
          on: "donation:show",
          function: ((event) => {
            const uid = event.donationid || event.data?.donationid
            const amount = parseFloat(event.amount || event.data?.amount)
            let magnitude = amount / 100

            if (magnitude > 1) {
              magnitude = 1
            }

            if (parseInt(amount * 100) % 2 == 0)
              return { uid: uid, action: "shrink", magnitude }
            else
              return { uid: uid, action: "grow", magnitude }
          })
        }
      ]
    }
  ]


}
