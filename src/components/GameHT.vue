<template>
    <div class="game-container">
      <h2 class="text-xl text-center font-semibold">Chọn trò chơi để học</h2>
      <div class="flex gap-4 justify-center mt-6">
        <button @click="currentGame = 'wordGuess'" class="game-btn">Đoán từ</button>
        <button @click="currentGame = 'quizGame'" class="game-btn">Trắc nghiệm</button>
        <button @click="currentGame = 'wordMatching'" class="game-btn">Nối từ</button>
        <button @click="currentGame = 'wordPuzzle'" class="game-btn">Ghép từ</button>
        <button @click="currentGame = 'listenChoose'" class="game-btn">Nghe và chọn</button>
        <button @click="currentGame = 'wordTyping'" class="game-btn">Nhập từ</button>
      </div>
  
      <div v-if="currentGame === 'wordGuess'">
        <h3>Đoán từ vựng</h3>
        <div class="word-guess-game">
          <img :src="currentImage" alt="Word Image" />
          <input type="text" v-model="userGuess" placeholder="Nhập từ..." />
          <button @click="checkGuess">Kiểm tra</button>
          <p v-if="resultMessage">{{ resultMessage }}</p>
        </div>
      </div>
  
      <div v-if="currentGame === 'quizGame'">
        <h3>Câu hỏi trắc nghiệm</h3>
        <div class="quiz-game">
          <p>{{ question.question }}</p>
          <div v-for="(option, index) in question.options" :key="index">
            <button @click="checkAnswer(option)">{{ option }}</button>
          </div>
          <p v-if="feedback">{{ feedback }}</p>
        </div>
      </div>
  
      <div v-if="currentGame === 'wordMatching'">
        <h3>Nối từ với nghĩa</h3>
        <div class="word-matching-game">
          <div class="flex">
            <div>
              <h4>Danh sách từ</h4>
              <div v-for="(item, index) in words" :key="index">
                <button @click="selectWord(item)">{{ item.word }}</button>
              </div>
            </div>
            <div>
              <h4>Danh sách nghĩa</h4>
              <div v-for="(item, index) in meanings" :key="index">
                <button @click="selectMeaning(item)">{{ item.meaning }}</button>
              </div>
            </div>
          </div>
          <p v-if="matchResult">{{ matchResult }}</p>
        </div>
      </div>
  
      <div v-if="currentGame === 'wordPuzzle'">
        <h3>Ghép từ</h3>
        <div class="word-puzzle-game">
          <p>{{ scrambledWord }}</p>
          <input type="text" v-model="userGuess" placeholder="Nhập từ ghép lại" />
          <button @click="checkPuzzle">Kiểm tra</button>
          <p v-if="resultMessage">{{ resultMessage }}</p>
        </div>
      </div>
  
      <div v-if="currentGame === 'listenChoose'">
        <h3>Nghe và chọn đáp án</h3>
        <div class="listen-choose-game">
          <audio :src="audioFile" controls></audio>
          <div v-for="(option, index) in options" :key="index">
            <button @click="checkAnswer(option)">{{ option }}</button>
          </div>
          <p v-if="feedback">{{ feedback }}</p>
        </div>
      </div>
  
      <div v-if="currentGame === 'wordTyping'">
        <h3>Nhập từ</h3>
        <div class="word-typing-game">
          <p>{{ currentWord }}</p>
          <input type="text" v-model="userGuess" placeholder="Nhập từ..." />
          <button @click="checkTyping">Kiểm tra</button>
          <p v-if="feedback">{{ feedback }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Quản lý game hiện tại
  const currentGame = ref("wordGuess");
  
  // Game 1: Đoán từ
  const words = [
    { word: "Dog", image: "https://tinhocnews.com/wp-content/uploads/2024/08/con-cho-vector-2.jpg", translation: "Con chó" },
    { word: "Cat", image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEBIWFhUVFxYVFhUVFxcYGBcYFRYXFhUXFxoZHSggGBolHhYXIjEhJyorLi4uFyAzODMsNygtMCsBCgoKDg0OGhAQGi0lHx0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYBAwQHAgj/xAA9EAABAwIFAQYEBAQFBAMAAAABAAIRAyEEBRIxQVEGEyJhcYEykaGxB0LB8BQjUtEzYqLh8RVygrI0Y5L/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEAAgICAwADAAAAAAAAAAABAhEhMQMSQVFhEyIy/9oADAMBAAIRAxEAPwD29ERRoREQEREGURERhfJX0SvmZQZCyvkL6RaLCyiIwiIooiLKAiIgIiKgiIgIiICIiAiIgIiICIiIIiIoiIgIiICOMCUXFmjvDp67+nRS3UJN1yYvHTcbcf3WzB42TCiu+32XJTxUOEdeB+yN1xuXLtMOFyC+lyYHECo2R++i6gu0u3GxlERVGEWVhFZRYRBlERAREUBERUEREBERAREQEREBERAREQEREBERAUbjjMn92XZiMQ1g8RA6earOX5ka+G1usZqMP+bQ4tLh0mJXPPKTh08eNvKNxVeCVupYXvGg6YO4Injnb7KrZviXydBkAkGPIE39gV0dms9cA+m59yNbQdhHhcBEEGADz7LhMueXrywsw3FzyvFCk6CRBOmS6ZkCJ4mWuEf5fNWFtYTC8xy2u5xL61QFwMO0xp1eNgf/AOoO0H1tMZ7inNYatOo46WCGtMOLmOn5kWg/89Znp5bjtegVlea4btTViWVZOjWA6PFAbO+xjUYMRCmcn7bMrBxczTpOkx1mNjflbmcYuFXBYc4C5UJiO0ABDabC9zuhAAGxLj0B+4Wt9Vzzcyf9LfQcnzKl8knBMKk6mYD8onz4Wn+LdN3R6AfrK5Ii5uOd5W7DU9bgItus7yrfrIlKBJFzK2rAWV1jkIiICIioIiICIiAiIgIiICIiAiwiDKIiAiIUFR7Y4vS+nvFwY6EET7LjxGEbTwDDTPwUg2RPiDoJIH9Ukrbn1Hv6uk7NmSBMAcELTUrh9M0t2kAATDrEECODbc9QvHlza9WF1pDZXg6WIwdRpY5rpdLrtP8AhuE38nu9woHI8nfQq1e9cCfiDZl5aANQsbO0kkb8TGyt1A1MNhi0Nh5c65iwd1vvIuq/UaadRrnhz3WLTEuIDXNI0j4vC51hebxBaRZqtXO7v6l+7AHhiHB1JxOz+7guPSQ1tv8AuPt8YTCPDSzXq1agOfhBAJ6GC63ouWlUeQ27HgOeBex16CWuIHgJHluBwSunCOe55fTP+GZq0xFw8bxxDtUHaHGCQBG+K48xAZrgHMxFOpqOjQ4OY0Cf5jmU22NrAQfeJuFKOpGi94FO7nhpdsCKhLyZPm4EHqbmy5swY7GaqBe4Gg6nBad3S43HIlsHgb8FSNcmtRDj/iMNNtQTJm+okebSB6q7G7KcS59Yu8JsGTPwul4iOmkA+ytmGidQ53HTdVbLqjGYdha2xqggx+Ugum3AsPbrvaaFKLzJ597wsSau1t4bKgDrkEAfVSWXstq6/ZRQOqZ/Lx6KbbUG0rphzds53jTai+Q5ZldXJ9LCSiDKLCIMoiICIioIiICIiAiIg+ZRa9SalBsWZWvUsyg+0JXzKw4oKxiqw7yod5MfKy0sawO1G7gNzE+xXJmuIDajwDsSYHzVaxXaajTDu+rwRfS34t/dePK3eo9Mk0t2IxDWnxGAYjpbzNlEYhlBri7vKcbw4sgT6+3PkqYMa3MXS41O7Fg0fEb26dNtlYcuyvA0bnD+LpBkcEgGTEcTG6zJZ21xeknUxeGps1vr0tMES58XPoTF+nmuTA9psvp1GvdXpNmWF4DiCLaQXwGlkGJI9xBmYxGCw2Mw9SjSbSD3Q4QGiXsIcA6OsAe5WMNgWucwPYzQ0PFSm9t5LS1tuoM2NvoR0lYrOHy0DGurME06tNha5sFroJkyNzB+oWzMMvYx73CRqnV0IIJPpeP2VWOwnaCjhcyxGVscDhy4vw15FN5aHVaQM/DOogdQequWc0dTzbpBgG8X9lqzTMu0PkGEc4FrxDaRqPYZkkFrmA7bgtd6WVjwNmNvM3kCAepv7/RfeAoBlKXSdUgNEAuLtgJgSZ55N1FUM/ezENw9fBmmwteWVWvFUaaZAdrAaNHxN67pP0vPTuzOqygyrWJhwYQ3UTBMeERtuq3ktPEVWd4+oRa199XPopvtdgxVoTqGkEEdDNh91C5HiXBpY60WA5IG5PQcKb1V1uNGLz6rhzeuTEjafcLflPa+o83e09AefMrV2gyw1gHhg8N77QPuvJM8zCox5aPBpcRAJkmZJd58QLCPJbmVrNkj9AUe0hnxAaf6hf1spjDZrTeJDvnZeQfhPg6mILq1V7i0eENJsT19F6kzBU27NVmdS4xMsrA7Ffcrz3thinYWnrovc1/vF/JVfKvxOxDKnd1gyoNtTSW/MkLUzlZuL2sFZUFk/aGnXAOoSelx6Sppr5W9s6faIiAiIqCIiAiIiOMuXz3iVGrmeVGnSKq+xVUeXr5NUhTa6SoqLhzbHikwknhaDjIVP7Z5vLRTbEmSBIBMeUypllqEx5aMYHVNZabuF7/W11Q8VSw+FfOIokuJ3Oo2/qcb+wifS02nsriKgJbV8AG08zsL9b+dlP5v2fp4kTA1dTMH1g/VeacO9UnKs9D3FuFpCDYB4AaOJERf5Ky0KOLc3+cGECC0tMVG+bTdp9Lep4iXZCKZhga1wO3ij2JEifVT+WsDSBUbUZJ/q1sJ9ePopdXpZudvvCVQ58VKUvH5tLgXiIvAiL8E3Vko1G1RFSmHNj84k2tE78SuZtFzRaSPf+y6KGsDxN1C92ube1gQdN+I80xuky5VbtPlVJlek/BUaNM04e4taGNaGvD3ElsTIaR+ypXA5wMQ4ua4EWgjYztH0XVi8A7F0nUqjNJLQXHTAkzAEuMkcheX5bnFTC412FcxzSHFmhxGt0GGloJGoEXmVjOZ3/Lpj665et1XfxB7gtaWmm+Wv2fcAifTy59V84ahUZXOIxJY1tNj6dJjCXuOstL3vgQD4GgNE83vA5MkrGs9zoc3u4aZEeI7c9CVM4prmiQSLbCDHUrr47bOe3LOauog+0b291/KLgHuBDZjqTY3A9LKKyjEsaI/NyTwB+q6+0uLMiLw0GYF/lf0HPzVAfXqFxaHAF0vc4m0naf7Dqs5XlqTh6hXxjSwwdhx914V23w2muZB2cR6k2nyvJ5Xp+Qv8Al5M8n8xO5/dlRfxHoxV16rRBAjYEfCOLm5WsMv7MZzhd/wbbGG3nxH0Xo7gFQPwooEYUO2B4gfcbq1ZrnNOgwucdlpNIPtq2aZ0lwsbt3Hp5ryfL+z4rPg1LTsDf36n0Ut2p7WisXCXtYZAA7tx99QmPdUrBz3g0uIk7pJey2dPYsBiqGXMbTqWH5Xgzv1B2VyyHtHTqw0Pmdj1+S88q5BUxWHbL9fNwbG3O5C+sg7PYmg4ucWhnz+10xz0ZYvZWVAVsCpWTZ09lnMc5pNnRPuOYVwoVg4SF3mUrlZptREWkEREBERBz1GrjrsUi4LmrsUVEudC+S9ZxghcDqpCy0+8XUtYXVCzuu+pV0lwbHBDAfIg6pPsPdWrG41rQSXNb6/7Svh2WiqA8PE7iTE7clt/cLnm3ih8mqOJ7mNUXJIIInznj+6uGEYGgB23GyhzhGEDvqYY8bHw7byHNETb2W5jywRTqH/AMgXOP0krlvTXaYxmDp1GwYUVh3upO0hpDeCTAHluWn2AXXhqpIh+r3Ee48v3db+7a24Mna6v7Dem5gc4bx9B+/ZYqSQW6r2/K0idwYddaGYmDE+p/QLqpaXR81Zqp0+sNQbTFw2d/C3TzJ2PUk36qk9tsPTxmLwvdkCu17hqA1aWAEFx/zAxF/zTwr23L2OuR6zf7pTyek3xaRMyCBBnaV00ztvw+DZSpNY0CNySLk8uMc+ajs1fWMhgbojxF8n5XUlUrBo8TgFA57njabdDXQXWa87Sdh1d0gX3iTAM7TarvAc9wLvC5pbaed4n6DqofOMGA1waJLACCBYDi/PVSWFY4PDiOAdLSHNE7FrhYtPDhY2Ntmsfl+oEn9T8+vRccu3bGuPs1XeKcuIk7Xlx9Z2CrX4h12l4YX8CGAciYJ8r89bDkWHKNIJAaSZ3MCPeVV+0uFdUxL3us1mkCYPImfFbcX8wmHaZ9PT+wGE/h8IwkmS3UZ9FXe02Mfia3ctYDBnbUCDwQY3+is2EcX0GsYRLqY0m1jt6KWynJxQZsCd9hym98HTyzEfh28nVUqhgO1id+Fz0Pw1rOcDTqQB1EH6Gy9fOGiXVPEOnHyVUzjtZQoHQwQTOwFvMCb+n1WpazZEzk2Adh6Ya6qXQOTI+qkm4hkX036c+y8xwebYzEucygA9pn426SJ2LTqj6LlxtPFOcKNRz6bwZaY7ubx4Xel94ViV6PVx+GpA/wAwAGTpHHWwXXl2YCnpcJ0HcgzE8xwqJR7F4l7QXYidUE2aT+l1J5flFSg/Tqc/UId1gdQrLpNbeqUKocJBkLYqhkOY904U3+EGdMnpwra10rvLuOdmn0sSsSi0jMosIoMla6jVtXyQghMzp2Vbq143VwzClIKo+YHSSPus1vFz4+rT0OLiBbcuI/8AUT8l09nKtENkaNJvJIv7EAn1UY1jSYJ9g3UfnBj5qey/I6bxJDpjk7eg2+65ZdtxLuw1Ko2Rbnwj/aFyYfE94/u2gjTuSYPQQB19doWyvRNJvhkmIAEewC6MvohjYcyCbk7kk+fK53tqdPluABdqcSSOpm/+yzWoEXH/AAsYPEfE6oYNyAdmtkwPkJ91pxeOAe2mNomfO8fZNzWzV25cXhyInrJXJhcZDuQJgxeJH/ClNDq4g2AG/JJsEwGGcKYBaJA3iZAsuNu7w6TicgxtZhAI3vPHsuqs+sR8TYi8z+wtFSi+qyJ9CN9lx4bLqjSe8eXD1NweLbHzC6e1Y1GrMCGADWdR5MEdbzbnayr2ctZUpmk/uyAPFHhjYgiT4dhtImImArHUp6TpYQ3qHGR7AA/oq9nOWGodbgPBfU2JJJsJJEDyuumNZyj77IY7vA+hVIL2GHAcg8zvex/7if6hEpmrw1p6AbgSBaxgLzGgKlLGUnUpBGqkd/F3V2ySCSe6fSbJ/pXo+ZVgaQdaHNA8MixkEAEWIIPyKmcMbtQspxGrEviTBmRMkf8Alt9Fwdo8VqaQXai86hEh0B2i453FrbTeIWmti6eHqP7ou1lxH8wC14kQSOd/JTdHJf4jNaLRdrKbKrxEBpJJj1k7eSmtXa72v/YLLSMNR70eJjBCuZbZc2CpaQB0C6qhspj0VX+0OLDGECb2kQQDFplUfG4Si0d5iHd4bwwiZtsQ79jyVnz7GOd4WNDwbOG7Y6m3Bj5qqYbIMP3vjrlxLh4NQABizSbA2t7DZTa6bcq7Q6mxQoubA+DuyXCPPaPdSRzmp8OKw5cwiZDHW6yHbdbL4xuZUsFDaQa13V0Qeblt53vHCxgO2rXiKzT4uWxAB9b/AE910xYrtybNmNkioS0Gzd7eU8KXxFQVHCoNtrqCZhqMitRMb/7zaF2VcX3YDSR8Xhvbfz9UvREjisvbV06txyN/JTuUVHNGhxmNjz7rlwjfACbnqsYep/M/UdPNb8dZyWBZWGL6XdzYRZRARERGqqyQqZ2kwukyruVDZ/gu8YfRZsaleatqFjxp235P2VqyvMgQPE0no25Pyt7yvPc5xBpOIcSIPG/spzsvjCG6y3f136nmTbYCVwyrrF+bdw2J+3X9+a669QNbMXMAepUZl7dXivfqf0ldTqZe4O4aVi9K3YnAtc2/z9FB16Omq2Bt9gFPUqpIh2/3Udj/AAkQ0uc47N4HU9AuPk18OmFbMI2BHJv+q62v0zP7kqOpvIPlP+36ruoCZ1bceV0wplGynTG4sufG1w0aW79OfZaczzIUGzu02kX0niR0XCM9wwaHl7CTMCRJPIbPPkuu/hjXy6ahZTaSR4v8yr+OxLdBLg0Em9pgewBI+a5M27TPxDu6wuqenjb7k6Yt0BKi8RRFA6q7w55HiAA2jaRFvWfZJV04M0ydlQfymhjQ5rg6wbOhwcQdh8LR7CyxTx5bRaA8GJggDaTMmY/5KmXdqqIAFUNDRcNBk35II9foozNM+w9Sm+nScNrCCBMzvPkt9sdKZhcCf4unRNJwDqjZ1tbcPuSCAJETBG69yybLg2tUrEeJ2hvs1th8yV4jkObd1VDy1zg1wcALtBB3HSV6vlP4gYeoRraWSdzEcedv0TLG2mN4Xfa6jc1qOcY1Q0QTG/7suepnVNzgWkaTz1naOq5c/wAeGMc4DVLSBF7uG/0+i55NRW8yqvcHMwzCHAGG/mfE/F7z5SCuFnYHFYganVBSaTq0XcR5X+RBkSAR5zHZCu1jTUdJc55be5MHTPWJn5qXxWePGoMA1tDXAAEgtcS07ci0xtIKRahsN2IeLVsQarRFi0CY2uLyOvkpJ2R4ak3S5ljYE8H1UZTxGOrPs/uwWkTF2kQQf83T+676ua1GxSxGl07vaDBEXsJIM/daliaaHYBlEiLA2BHhBn4SYMFaXUnYl7BTBFFlyTfUZIhvpG67309bf5jZiSAYkW6bFVntP2vfhy1lJkOAEAgwOqWbOl9xOZChTJtaN+ePZcuCxzRiGat3nra+y8xrdqquJcTUsydh7c83CmKObaXsMzcf3uFvGWWMWzT2xi+5XJgKmpjT1AK6V6XJ9SiwsIPpESUQXxUpgiCvuUlB572z/D9+ImphntD/AOl8gE+ThsqBh8LisA7RiYpxsTMR/wB17e43X6AlVTt9gqdXDPDxNreq554SxvG2VUsH2npsAaHy48tgD/UZ/RWjLKlSBpEjc6nXud7Dn9AvPexvZVrnd4+m46TYONheYFvrdej4emRLe70t3BBgmfMGQV5bvbvOknRLiPEI+o/fsubHAQbkE8ix9uq7cK60Em3W/wBVGZ5ULG6mAkj8o3PkOhWMulnb61hzYBvvG5gTH2PyWDiDtzcDoTFlxUm6WhzgQYNtjHAF+Jn3W3B4ylWbppunq0yCLD5WhSKrWN7M1azxOJczxEhtjAPB6i/34iN1LsdSp6i+i2tJDnEkmTefCT787rtxvZljxapUBGx1uJHTc3XB/EZhghLx/FU+rPDUb0gRDvTzSbXaHxWbVKTSzD4ZtJrTctPiDTMEgtngz6cqDOSMxk1S+rUIHiaGh1RgN50VHz/+ZCuX8RQzIF1F7aWKaSBqA12Fw5u8HaFFvw+Fq1RSc92FxbTDLab3+Bx8NRpgnr6LpjbGLNqjgMpwb6gpuxtYEG9KrRLD05Jb9V15rQw1Gk8Uma4aYOnxCbAnUb7zsYjhSPaHA4uj/wDMpUazRJbXbDHEdOuvmPquvs1D2nSdQfZoc24jcEyZ6Ldt7Z1Onl+Go1hDtL/kQpehj3R4hf0Nx0d1H7uvWMRktCqwks1fE3oARIMD6Sqf2g7O06dJz6RILQLCfIG0+YV/m+4z/H9NGEzakymaZcQDcQZLSb7QBx5KMZ2jrU5YXlzZtNx8jsVAHFnVpMmDuB+kLZon+x1Arr6xj2r0Psr2hw7zD2HUYALXi0XHgN4neJ9hZWoAsBqUW6xAjxRsCDEiPbyC8Ra0TDmgg9YMdIIggqxZDnhw7gO8qNZ/RILbcAF8gRzI9LLN8camabz3ttUpnu209Dh/UZ39r+xVXxvbDFPMuc0HcaWwfUFZ7T5kyu6QW+oEH3Lf7qE79oFhttzfqZCuOE+kyzqRf2qxe3fuFoIJ/clcz6z6pBe4udIEk9Tx81ow+Eq4hwFCk+obf4bC649AYCuuR/hdj65DqrW0Gf8A2GXR5Nb+sLcxY9qq5cGPGkhwGwuLfS+9lc+xWR1cVUFQiGAgEXuDyJ5Flc8o/CXB0oNdz6zh1Oho6wG3+ZKvOCy+lRaGUmBrRsAFqSROX1gaWhjW9AAumV8wsqqzKLCKD6WIRJQFhZlJQaqr4F1X8yxrXmG+Ig+e6nsZT1NI8lQGvdTqmmZDiZ9oOxPO3yXPy2yOmElrpxmOxDARF7GQDAG9hG8DaeVr/wCpVNMPMOuQ6IBAjg7bxHqubG4iuWQzxOY462tlvhO5bAJcQIPnccqP7VPeKBg3Aa5josdpBANwV48pdu8sSmSZ3Ue5zX8GAWkEzvGkXafVSdfM6jXQNLuIAuLTe5tv0496V2WpmphoY/8Am1SWlwsKfWBG8D6qzYXA6qjtJOmmO6gmNThBJkdJiykxq2x2nMDUllVgIv8AFBEA34Wr+Ap6tdA6H3sPhdP9Q/cL5xbS402NIJJ1C8O0tvPnBge44XZQoAEkn4djfaNiU1U3HXRdIuIPIPkgabfu/ssZfjWVjDDJG5H0KlaeG8l1xw2xctKl2i7G4fEDvQzRVadQqU4Y+fMjf3XKcm/jMLFdpdUZ/UGl0g2IPXa4+av3cDlfTaQGwXaeJzuam5Lg8RUpd1iKXw2DnizhsJ1XmP8AlR2W9lMdRrOJbhjS16qbWucwtHSzIk9fvC9GAWYXT0jNyqqf9HxTaxdTNLuniX03lxIftLCBsRuOsea6MXkLnsOltJrzuXantB9LSrHCQnpj9J7V4rj/AMHMU57nsxdHxGSO7e0X9CVopfhBjQIOIpEcwXD7sK9xhIWmdPHG/hFVgfzKYPJLnuB9g0R81IUfwlcQG1MUAOQymfPYudbjheqQsppXnOC/B/AtvVfWq+RcGj/SJ+qsWA7CZdRILMJTkbF41n/XKsiKmo1UMMxghjWtHRoAH0W2ERQIWYRECEREBERAlJRYQZlJRYQFoxGEZU+NoMbSLj0K3ogjRklEOL9PicINzt+i04ns3h6jS17XFpmRqdySeD5lTCKesXdV7C9jMJRcHUWOpwZhjiGkxF27LtpZLTa5xBd4zqcJsTyfdSiwlxlN1EuyCkajavi1sBAM8O3H2+QW+vlNOoNLgYO8GPqLrvRPWfRuuTL8tpYdumiwNG8Dk9T1K6oWUVQREQEREBZREBERAREQEREBEWUBERAREQFhZWEBERAREQEREBERBhERARZRBhFlEBERAREQEREBERAREQEREGVhEQZWERAREQEREH//2Q==", translation: "Con mèo" },
    { word: "Fish", image: "https://vnmedia2.monkeyuni.net/upload/web/img/ca-tieng-anh-la-gi-2.jpg", translation: "Con cá" },
  ];
  
  const currentImage = ref(words[Math.floor(Math.random() * words.length)].image);
  const userGuess = ref("");
  const resultMessage = ref("");
  
  const checkGuess = () => {
    const currentWord = words.find((w) => w.image === currentImage.value);
    if (userGuess.value.toLowerCase() === currentWord.word.toLowerCase()) {
      resultMessage.value = "Chính xác!";
    } else {
      resultMessage.value = `Sai, đáp án đúng là ${currentWord.word}`;
    }
  };
  
  // Game 2: Trắc nghiệm
  const questions = [
    {
      question: "What is the capital of South Korea?",
      options: ["Seoul", "Tokyo", "Beijing", "Hanoi"],
      correctAnswer: "Seoul",
    },
    {
      question: "What is the official language of Japan?",
      options: ["Korean", "Japanese", "Chinese", "English"],
      correctAnswer: "Japanese",
    },
  ];
  
  const question = ref(questions[0]);
  const feedback = ref("");
  
  const checkAnswer = (answer) => {
    if (answer === question.value.correctAnswer) {
      feedback.value = "Chính xác!";
    } else {
      feedback.value = `Sai, đáp án đúng là: ${question.value.correctAnswer}`;
    }
  };
  
  // Game 3: Nối từ
  const meanings = [
    { meaning: "Con chó" },
    { meaning: "Con mèo" },
    { meaning: "Con cá" },
  ];
  
  const selectedWord = ref(null);
  const selectedMeaning = ref(null);
  const matchResult = ref("");
  
  const selectWord = (word) => {
    selectedWord.value = word;
  };
  
  const selectMeaning = (meaning) => {
    selectedMeaning.value = meaning;
    if (selectedWord.value && selectedMeaning.value) {
      matchResult.value = selectedWord.value.word === selectedMeaning.value.meaning
        ? "Nối đúng!"
        : "Sai, thử lại!";
    }
  };
  
  // Game 4: Ghép từ
  const word = "Apple";
  const scrambledWord = ref(word.split("").sort(() => Math.random() - 0.5).join(""));
  
  const checkPuzzle = () => {
    if (userGuess.value.toLowerCase() === word.toLowerCase()) {
      resultMessage.value = "Chính xác!";
    } else {
      resultMessage.value = "Sai, thử lại!";
    }
  };
  
  // Game 5: Nghe và chọn
  const audioFile = ref("audio-file-url.mp3");
  const options = ref(["Apple", "Banana", "Cherry"]);
  const correctAnswer = "Apple";
  
  const checkAudioAnswer = (answer) => {
    feedback.value = answer === correctAnswer ? "Chính xác!" : "Sai, thử lại!";
  };
  
  // Game 6: Nhập từ
  const currentWord = "Computer";
  
  const checkTyping = () => {
    feedback.value = userGuess.value.toLowerCase() === currentWord.toLowerCase()
      ? "Chính xác!"
      : "Sai, thử lại!";
  };
  </script>
  
  <style scoped>
.game-container {
  padding: 40px;
  text-align: center;
  background: linear-gradient(to right, #6a11cb, #2575fc); /* Màu nền đẹp, tạo hiệu ứng gradient */
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng cho container */
  color: #fff;
  max-width: 900px;
  margin: 30px auto;
}

h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4); /* Đổ bóng cho tiêu đề */
}

h3 {
  margin-top: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #ffeb3b; /* Màu vàng cho tiêu đề game */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.game-btn {
  padding: 12px 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.game-btn:hover {
  background-color: #45a049;
  transform: translateY(-3px); /* Hiệu ứng nâng nút lên khi hover */
}

.game-btn:active {
  background-color: #3e8e41; /* Thay đổi màu khi nút được nhấn */
  transform: translateY(2px); /* Hiệu ứng nhấn xuống khi click */
}

input[type="text"] {
  margin-top: 15px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
  width: 300px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #4CAF50;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #f57c00;
  transform: translateY(-2px); /* Hiệu ứng nâng nút khi hover */
}

button:active {
  background-color: #e65100; /* Màu đậm khi nhấn */
  transform: translateY(1px); /* Hiệu ứng nhấn xuống khi click */
}

p {
  font-size: 18px;
  color: #ffeb3b;
  margin-top: 20px;
  font-weight: bold;
}

audio {
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button + button {
  margin-top: 10px;
}

button + button:hover {
  background-color: #45a049;
}

button + button:active {
  background-color: #3e8e41;
}

.word-guess-game img,
.word-matching-game img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.word-guess-game,
.word-matching-game,
.word-puzzle-game,
.listen-choose-game,
.word-typing-game {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.word-guess-game input,
.word-puzzle-game input,
.word-typing-game input {
  width: 300px;
  padding: 12px;
  margin-top: 15px;
  border-radius: 8px;
  font-size: 16px;
  border: 2px solid #ddd;
}

.word-guess-game input:focus,
.word-puzzle-game input:focus,
.word-typing-game input:focus {
  border-color: #4CAF50;
  outline: none;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

@media (max-width: 768px) {
  .game-btn {
    padding: 8px 15px;
    font-size: 16px;
  }

  input[type="text"] {
    width: 80%;
    font-size: 14px;
  }

  .game-container {
    padding: 20px;
  }

  h3 {
    font-size: 24px;
  }

  .word-guess-game img,
  .word-matching-game img {
    width: 150px;
    height: 150px;
  }
}
</style>

  