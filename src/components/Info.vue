<template>
  <section class="info">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <p>
            <strong>What is this?</strong><br />
            This tool gives you more insight into your movie watching habits and provides fun information about the movies you watched, based on your IMDb rating history.<br />
            This application is not affiliated wih IMDb in any way.
          </p>
          <p>
            <strong>Who can use this?</strong><br />
            It can be used by anyone with a IMDb user account that has made it a habit to rate movies after watching them.
          </p>
          <p>
            <strong>How does it work?</strong><br />
            <strong>I already have an IMDb account</strong>
            <ol>
              <li>Log in to IMDb</li>
              <li>Click on your name in the top right</li>
              <li>Click on Your Ratings</li>
              <li>Click on the three vertical dots - it's a menu!</li>
              <li>Click on Export - this will download a CSV file to your computer.</li>
              <li>Come back here and upload the file.</li>
            </ol>
            <strong>I don't have an IMDb account</strong>
            <ol>
              <li>Things get tricky if you don't have an account as the application can (for now) only parse information from a file in the structure exported by IMDb. The file itself is a regular CSV file which can be open with most/all spreadsheet software such as Microsoft Excel.</li>
              <li>You can grab a template of the IMDb ratings export from <a href="/static/example.csv">here</a>.</li>
              <li>Fill your movie ratings historical data in manually. If you're tech savvy enough and can do it automatically somehow, that's obviously also an option.</li>
            </ol>
          </p>
          <p>
            <strong>What about the privacy of my data?</strong><br />
            No information is sent to a server - all the data parsing happens in the browser. No need to be afraid of being shamed by your friends for the movies you watched. Unless...
          </p>
          <p>
            <strong>What if I do want my friends to see my ratings?</strong><br />
            Once the app parses your uploaded CSV, you also get the option of sharing your movie watch history with other people. It's your choice who you share this with. It's only at this point that information in the movie history file is sent and saved to a server. A very simple back-end handles this and it can also be seen <a target="_blank" href="https://github.com/victorelu/cinestat-backend">here</a>.
          </p>
          <p>
            <strong>Who built this thing?</strong><br />
            It's built by <a href="https://victor.avasiloaei.com" target="_blank">Victor Avasiloaei</a>, a software developer based in Amsterdam, Netherlands, who finds it weird to refer to himself in 3rd person.<br />
            The code behind it is available on <a target="_blank" href="https://github.com/victorelu/cinestat-frontend">GitHub</a>. This page is NOT affiliated with IMDb in any way.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { }
</script>
