object KnightsTour {

  sealed trait TourMethod {
    def methodName: String

    def exec: Unit
  }

  object TourMethod {
    case object BruteForce extends TourMethod {
      val methodName = "BruteForce"

      def exec = {
        ()
      }
    }

    case object BreakWhenBlocked extends  TourMethod {
      val methodName = "BreakWhenBlocked"

      def exec = {

        ()
      }
    }

    def parse(input: String): TourMethod = input match {
      case BruteForce.methodName => BruteForce
      case BreakWhenBlocked.methodName => BreakWhenBlocked
      case _ => throw new IllegalArgumentException(s"Unknown tour method: [$input]")
    }
  }

  def main(args: Array[String]) {
    if (args.nonEmpty) {
      TourMethod.parse(args(0)).exec
    } else {
      throw new UnsupportedOperationException("No tour method provided")
    }
  }

}
